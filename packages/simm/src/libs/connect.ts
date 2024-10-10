import { Client } from "ssh2";
import consola from "consola";
import { SimmConfig } from "../types";

function connectToNextServer(
  simmConfig: SimmConfig,
  client: Client,
  jumpConfig: any,
  serverConfig: any,
  onReady: (client: Client, otherClient?: Client) => void,
  prevClient?: Client,
) {
  client.on("ready", () => {
    if (serverConfig.proxyJump) {
      const nextJumpConfig = simmConfig?.servers?.[serverConfig.proxyJump];
      if (!nextJumpConfig) {
        consola.error(`proxyJump ${serverConfig.proxyJump} is not defined`);
        return;
      }

      consola.info(`Jumping to server ${nextJumpConfig.host}...`);
      client.forwardOut(
        "127.0.0.1",
        8124,
        nextJumpConfig.host as string,
        nextJumpConfig.port || 22,
        (err, stream) => {
          if (err) {
            consola.error(`Error jumping to server ${nextJumpConfig.host}`);
            throw err;
          }
          const nextClient = new Client();
          connectToNextServer(simmConfig, nextClient, nextJumpConfig, serverConfig, onReady, client);
        },
      );
    } else {
      consola.success(`Connected to final server ${serverConfig.host}`);
      onReady(client, prevClient);
    }
  });

  client.connect({
    ...jumpConfig,
    agentForward: true,
    agent: process.env.SSH_AUTH_SOCK,
  });
}

export function sshConnect(
  simmConfig: SimmConfig,
  environment: string,
  onReady: (client: Client, otherClient?: Client) => void,
) {
  const client = new Client();
  const serverConfig = simmConfig?.servers?.[environment];
  if (serverConfig && serverConfig.proxyJump) {
    const initialJumpConfig = simmConfig?.servers?.[serverConfig.proxyJump];
    if (initialJumpConfig) {
      consola.info(`Connecting to initial jump server ${initialJumpConfig.host}...`);
      connectToNextServer(simmConfig, client, initialJumpConfig, serverConfig, onReady);
    } else {
      consola.info(`Connecting directly to server ${serverConfig.host}...`);
      client.connect({
        ...serverConfig,
      });
      client.on("ready", () => onReady(client));
    }
  } else {
    consola.error("Server config not found");
  }
}
