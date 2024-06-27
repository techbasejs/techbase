import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { defineCommand } from "citty";
import { resolve } from "pathe";
import consola from "consola";
import { sshConnect } from "../libs/connect";
import { SimmConfig } from "../types";
import { createResolver } from "../_resolver";
import { SFTPWrapper } from "ssh2";

const countFiles = (sourcePath: string) => {
  let count = 0;
  const files = fs.readdirSync(sourcePath);
  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file);
    const stats = fs.statSync(sourceFilePath);
    if (stats.isDirectory()) {
      count = count + countFiles(sourceFilePath);
    } else if (stats.isFile()) {
      count++;
    }
  }

  return count;
}

const uploadFolderViaSftp = async (sftp: SFTPWrapper, sourcePath: string, destPath: string, totalFiles: number, callback?: (err?: string | null) => void) => {
  let uploadedFilesCount = 0;
  const files = fs.readdirSync(sourcePath);
  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file);
    const destFilePath = path.join(destPath, file);
    const stats = fs.statSync(sourceFilePath);
    if (stats.isFile()) {
      const filename = path.basename(sourceFilePath);
      await new Promise<void>((resolve, reject) => {
        const readStream = fs.createReadStream(sourceFilePath);
        const writeStream = sftp.createWriteStream(destFilePath);
        writeStream.on('close', () => {
          ++uploadedFilesCount;
          consola.success(
            `File ${filename} transferred successfully`,
          );
          resolve()
        });
        writeStream.on('error', (err: any) => {
          callback?.(JSON.stringify(err));
          reject(err)
        });
        readStream.pipe(writeStream);
      });
      if (uploadedFilesCount === totalFiles) {
        consola.success(
          `Files transferred successfully`,
        );
        callback?.();
      }
    } else if (stats.isDirectory()) {
      sftp.mkdir(destFilePath, { mode: '0755' }, async () => {
        const newCount = await uploadFolderViaSftp(sftp, sourceFilePath, destFilePath, totalFiles, callback); // Recurse for subfolders
        uploadedFilesCount = uploadedFilesCount + newCount;

        if (uploadedFilesCount === totalFiles) {
          consola.success(
            `Files transferred successfully`,
          );
          callback?.();
        }
      });
    }
  }

  return uploadedFilesCount;
}

export default defineCommand({
  args: {
    environment: {
      type: "positional",
      required: true,
      description: "Environment",
    },
    workDir: {
      type: "string",
      required: false,
      description: "working directory",
    },
  },
  async run({ args }) {
    const { workDir, environment } = args;
    const resolver = await createResolver();
    const configPath = resolve(workDir, `simm.config.ts`);
    const simmConfig: SimmConfig = await resolver.import(configPath);

    const sourcePath = resolve(
      workDir,
      simmConfig.servers[environment].sftp?.source as string,
    );

    const destPath = simmConfig.servers[environment].sftp?.dest as string;
    const preSftp = simmConfig.servers[environment].sftp?.preSftp as string;
    const postSftp = simmConfig.servers[environment].sftp?.postSftp as string;
    const totalFiles = countFiles(sourcePath);

    sshConnect(simmConfig, environment, (client) => {
      client.sftp((err, sftp) => {
        try {
          if (err) {
            throw err;
          }

          if (preSftp) {
            const cmd = [preSftp];
            if (workDir) {
              cmd.unshift(`cd ${workDir}`);
            }
            execSync(cmd.join(" && "), { stdio: "inherit" });
          }

          execSync(`rm -rf ${destPath}`, { stdio: "inherit" });

          uploadFolderViaSftp(sftp, sourcePath, destPath, totalFiles, (err) => {
            sftp.end();
            if (err) {
              throw err;
            }
            if (postSftp) {
              const cmd = [postSftp];
              client.exec(cmd.join(" && "), (err, stream) => {
                if (err) {
                  throw err;
                }
                stream
                  .on("data", (data: Buffer) => {
                    consola.success(data.toString());
                  })
                  .stderr.on("data", (data) => {
                    consola.error(data.toString());
                  })
                  .on("close", () => {
                    stream.end();
                    client.end();
                  });
              });
            } else {
              client.end();
            }
          })
        } catch {
          client.end();
          client.destroy();
        }
      });
    });
  },
});
