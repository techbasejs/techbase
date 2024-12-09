import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { defineCommand } from "citty";
import { resolve } from "pathe";
import consola from "consola";
import { sshConnect } from "../libs/connect";
import { SimmConfig, SimmServerSftpFile } from "../types";
import { createResolver } from "../_resolver";
import { SFTPWrapper } from "ssh2";
import { MultiBar, Presets } from "cli-progress";

/**
 * Uploads a folder and its contents to a remote server via SFTP.
 *
 * @param sftp The SFTPWrapper instance for the connection.
 * @param sourcePath The absolute path to the local folder to upload.
 * @param destPath The absolute path to the destination folder on the remote server.
 * @param totalFiles The total number of files expected to be uploaded.
 * @param callback Optional callback function to be called when the upload is complete or encounters an error.
 * @returns A Promise that resolves to the total number of files uploaded.
 */
const uploadFolderViaSftp = async (
  sftp: SFTPWrapper,
  files: SimmServerSftpFile[],
  callback?: (err?: string | null) => void,
) => {
  const multibar = new MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: " {bar} | {filename} | {value}/{total}",
    },
    Presets.shades_grey,
  );
  const b1 = multibar.create(100, 0);
  const b2 = multibar.create(100, 0);

  await Promise.all(
    files.map((file, index) => {
      const sourceFilePath = file.source;
      const destFilePath = file.dest;
      let uploadedBytes = 0;
      const fileSize = fs.statSync(sourceFilePath).size;
      const filename = path.basename(sourceFilePath);
      const readStream = fs.createReadStream(sourceFilePath);
      const writeStream = sftp.createWriteStream(destFilePath);
      writeStream.on("close", () => {
        consola.success(`File ${filename} transferred successfully`);
      });
      readStream.on("data", (chunk) => {
        uploadedBytes += chunk.length;
        const fileProgressPercent = Math.floor(
          (uploadedBytes / fileSize) * 100,
        );
        if (index === 0) {
          b1.update(fileProgressPercent, { filename: filename });
        } else {
          b2.update(fileProgressPercent, { filename: filename });
        }
      });
      writeStream.on("error", (err: any) => {
        callback?.(JSON.stringify(err));
      });
      readStream.pipe(writeStream);
    }),
  );

  multibar.stop();

  callback?.(null);
};

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

    const files = simmConfig.servers[environment].sftp?.files;

    if (!files) {
      console.log("files is undefined");
      return;
    }

    const preSftp = simmConfig.servers[environment].sftp?.preSftp as string;
    const postSftp = simmConfig.servers[environment].sftp?.postSftp as string;

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

          uploadFolderViaSftp(sftp, files, (err) => {
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
          });
        } catch {
          client.end();
          client.destroy();
        }
      });
    });
  },
});
