import path from "node:path";
import { defineCommand } from "citty";
import { resolve } from "pathe";
import consola from "consola";
import { sshConnect } from "../libs/connect";
import { SimmConfig } from "../types";
import { createResolver } from "../_resolver";
import { SSHSftpReadDir } from "../libs/ssh";

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
    sshConnect(simmConfig, environment, async (client, otherClient) => {
      consola.success("Server connected");
      consola.info("Deploy is starting...");
      try {
        const deployConfig = simmConfig?.servers?.[environment]?.deploy;
        if (!deployConfig) {
          throw new Error("Deploy config not found");
        }
        const branchName = deployConfig.branch;
        let deployCommand = [
          `git clone --single-branch -b ${branchName} --progress --verbose ${deployConfig.repo} ${deployConfig.path}`,
          `cd ${deployConfig.path}`,
          `pnpm install && pnpm build`,
        ];
        const postDeployCmd = deployConfig.postDeploy || "";
        const gitConfigPath = path.join(deployConfig.path as string, ".git");
        const { result } = await SSHSftpReadDir(client, gitConfigPath);

        if (result) {
          deployCommand = [
            `cd ${deployConfig.path}`,
            "git clean -d -f",
            `git fetch origin ${branchName}:origin/${branchName}`,
            `git reset --hard origin/${branchName}`,
          ];
        }

        if (postDeployCmd) {
          deployCommand.push(postDeployCmd);
        }

        client.exec(deployCommand.join("\n"), (err, stream) => {
          if (err) {
            throw err;
          }
          stream.on("data", (data: Buffer) => {
            console.log(data.toString());
          });
          stream.stderr.on("data", function (data: Buffer) {
            const output = data.toString();
            if (output.startsWith("fatal")) {
              console.log(output);
            } else {
              console.log(output);
            }
          });
          stream.on("close", () => {
            consola.success("Deploy successfully!");
            if (otherClient) {
              otherClient.destroy();
            }
            client.destroy();
            stream.destroy();
            stream.close();
          });
        });
      } catch (error) {
        client.destroy();
        consola.error(error);
      }
    });
  },
});
