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
      description: "Working directory",
    },
  },
  async run({ args }) {
    const { workDir, environment } = args;
    const resolver = await createResolver();
    const configPath = resolve(workDir, `simm.config.ts`);
    const simmConfig: SimmConfig = await resolver.import(configPath);
    sshConnect(simmConfig, environment, async (client, otherClient) => {
      consola.success("Server connected");
      consola.info("Docker Deploy is starting...");

      try {
        const deployConfig = simmConfig?.servers?.[environment]?.dockerDeploy;
        if (!deployConfig) {
          throw new Error("Docker Deploy config not found");
        }

        const deployCommand = [
          `cd ${deployConfig.path}`,
          `docker-compose down`,
          `docker-compose pull`, // Pull the latest image
          `docker-compose up -d --build`, // Rebuild and start containers
        ];

        const postDeployCmd = deployConfig.postDeploy || "";

        const dockerComposeConfigPath = path.join(deployConfig.path as string, "docker-compose.yml");
        const { result } = await SSHSftpReadDir(client, dockerComposeConfigPath);

        if (!result) {
          throw new Error("docker-compose.yml not found in the specified path");
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
              consola.error(output);
            } else {
              consola.warn(output);
            }
          });
          stream.on("close", () => {
            consola.success("Docker Deploy successfully completed!");
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
        consola.error("Deployment failed with error: ", error);
      }
    });
  },
});
