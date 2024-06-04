import { Client } from "ssh2";
import consola from "consola";
import { SimmConfig } from "../types";

export function sshConnect(
  simmConfig: SimmConfig,
  environment: string,
  onReady: (client: Client, otherClient?: Client) => void,
) {
  const client = new Client();
  const serverConfig = simmConfig?.servers?.[environment];
  if (serverConfig) {
    const jumpClient = new Client();
    if (serverConfig.proxyJump) {
      const jumpConfig = simmConfig?.servers?.[serverConfig.proxyJump];
      consola.info(`Connecting to server ${jumpConfig.host}...`);
      if (!jumpConfig) {
        consola.info("proxyJump is not defined");
        return;
      }
      client
        .on("ready", () => {
          client.forwardOut(
            "127.0.0.1",
            8124,
            serverConfig.host as string,
            serverConfig.port || 22,
            (err, stream) => {
              if (err) {
                throw err;
              }
              consola.info(`Jumping to server ${serverConfig.host}...`);
              jumpClient.connect({
                sock: stream,
                ...serverConfig,
              });
            },
          );
        })
        .connect({
          ...jumpConfig,
          agentForward: true,
          agent: process.env.SSH_AUTH_SOCK,
        });
    } else {
      consola.info(`Connecting to server ${serverConfig.host}...`);
      jumpClient.connect({
        ...serverConfig,
      });
    }
    jumpClient.on("ready", () => {
      onReady(jumpClient, client);
    });
  } else {
    consola.info("Config not found");
  }
}
