import { defineCommand } from "citty";
import consola from "consola";
import { resolve } from "pathe";
import { createResolver } from "../_resolver";
import { SimmConfig } from "../types";
import { sshConnect } from "../libs/connect";

export default defineCommand({
  meta: {
    name: "exec",
    description: "Executes the application and runs the provided exec command",
  },
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
      consola.info("Exec is starting...");

      try {
        const execConfig = simmConfig?.servers?.[environment]?.exec;
        const execCommand = execConfig?.afterDeploy;

        if (!execConfig) {
          throw new Error("Exec config not found");
        }

        if (!execCommand) {
          throw new Error("Exec command not found");
        }

        client.exec(execCommand, (err, stream) => {
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
            consola.success("Exec successfully!");

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
