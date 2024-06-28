import fs from "node:fs";
import { execSync } from "node:child_process";
import { defineCommand } from "citty";
import { resolve } from "pathe";
import consola from "consola";
import { sshConnect } from "../libs/connect";
import { SimmConfig } from "../types";
import { createResolver } from "../_resolver";
import path from "node:path";

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
    const sourcePathWithoutLastDir = path.join(sourcePath, '..');
    const lastDir = `${sourcePath.split('/')[sourcePath.split('/').length - 1]}`
    const destPath = path.join(simmConfig.servers[environment].sftp?.dest as string);
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

          /** zip folder / file */
          consola.start("zip folder: ", `${lastDir}.tar.gz`);
          const cmdZip = [
            `cd ${sourcePathWithoutLastDir}`,
            `tar -czvf ${lastDir}.tar.gz --exclude='**/__MACOSX' --exclude='**/.DS_Store' ${lastDir} `

          ]
          execSync(cmdZip.join(" && "), { stdio: "inherit" });
          const zipSourcePath = path.join(sourcePathWithoutLastDir, `${lastDir}.tar.gz`)
          const zipDestPath = path.join(destPath, `${lastDir}.tar.gz`)
          const readStream = fs.createReadStream(zipSourcePath);
          const writeStream = sftp.createWriteStream(zipDestPath);
          consola.start("Uploading file to server");
          writeStream.on("error", (error: Error) => {
            console.error(`Error writing file ${destPath}:`, error);
          });

          let uploadedBytes = 0;
          const totalBytes = fs.statSync(zipSourcePath).size;
          readStream.on("data", (chunk) => {
            uploadedBytes += chunk.length;
            consola.start(
              `File ${((uploadedBytes / totalBytes) * 100).toFixed(2)}% uploaded`,
            );
          });

          writeStream.on("error", (error: Error) => {
            sftp.end();
            client.end();
            console.error(`Error writing file:`, error);
          });

          writeStream.on("close", () => {
            sftp.end();
            consola.success(`File transferred successfully`)
            
            if (postSftp) {
              const cmd = [
                `cd ${destPath}`,
                `tar -xvf ${lastDir}.tar.gz`,
                `rm -rf ${lastDir}.tar.gz`,
                postSftp
              ];
              client.exec(cmd.join(" && "), (err, stream) => {
                if (err) {
                  throw err;
                }
                stream
                  .on("data", (data: Buffer) => {
                    // consola.success(data.toString());
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
              client.exec([
                `cd ${destPath}`,
                `tar -xvf ${lastDir}.tar.gz`,
                `rm -rf ${lastDir}.tar.gz`,
              ].join(" && "), (err, stream) => {
                if (err) {
                  throw err;
                }
                stream
                    .stderr.on("data", (data) => {
                      consola.error(data.toString());
                    })
                    .on("close", () => {
                      stream.end();
                      client.end();
                    });
              })
            }
          });

          readStream.pipe(writeStream);
        } catch {
          client.end();
          client.destroy();
        }
      });
    });
  },
});
