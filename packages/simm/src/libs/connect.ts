import { Client, ConnectConfig } from "ssh2";
import consola from "consola";
import { SimmConfig } from "../types";

interface ServerConfig extends ConnectConfig {
  proxyJump?: string;
}

function connectThroughJump(
  jumpConfigs: ServerConfig[],
  onReady: (client: Client, otherClient?: Client) => void,
  finalConfig: ServerConfig,
) {
  if (jumpConfigs.length === 0) {
    if (!finalConfig.host) {
      consola.error("Final server configuration is missing a host.");
      return;
    }
    consola.info(`Connecting to final server ${finalConfig.host}...`);
    const finalClient = new Client();
    finalClient
      .on("ready", () => {
        consola.success("Connected to final server");
        onReady(finalClient);
      })
      .connect(finalConfig);
    return;
  }

  const [nextConfig, ...remainingConfigs] = jumpConfigs;
  const nextClient = new Client();

  consola.info(`Connecting to intermediate server ${nextConfig.host}...`);
  nextClient
    .on("ready", () => {
      consola.info(`Connected to intermediate server ${nextConfig.host}`);

      if (remainingConfigs.length > 0 && remainingConfigs[0].host) {
        nextClient.forwardOut(
          "127.0.0.1",
          8124,
          remainingConfigs[0].host as string,
          remainingConfigs[0].port || 22,
          (err, stream) => {
            if (err) {
              consola.error("Error during forwarding:", err);
              nextClient.end();
              return;
            }
            consola.info(
              `Forwarding to next server ${remainingConfigs[0].host}...`,
            );
            connectThroughJump(remainingConfigs, onReady, finalConfig);
          },
        );
      } else if (finalConfig.host) {
        nextClient.forwardOut(
          "127.0.0.1",
          8124,
          finalConfig.host as string,
          finalConfig.port || 22,
          (err, stream) => {
            if (err) {
              consola.error("Error during forwarding to final server:", err);
              nextClient.end();
              return;
            }
            const finalClient = new Client();
            finalClient
              .on("ready", () => {
                consola.success("Connected to final server");
                onReady(finalClient, nextClient);
              })
              .connect({
                sock: stream,
                ...finalConfig,
              });
          },
        );
      } else {
        consola.error("Final configuration is missing a host.");
        nextClient.end();
      }
    })
    .connect({
      ...nextConfig,
      agentForward: true,
      agent: process.env.SSH_AUTH_SOCK,
    });
}

export function sshConnect(
  simmConfig: SimmConfig,
  environment: string,
  onReady: (client: Client, otherClient?: Client) => void,
) {
  const serverConfig = simmConfig?.servers?.[environment];
  if (!serverConfig) {
    consola.info("Config not found");
    return;
  }

  const jumpConfigs: ServerConfig[] = [];
  let currentConfig = serverConfig;

  while (currentConfig?.proxyJump) {
    const nextConfig = simmConfig.servers[currentConfig.proxyJump];
    if (!nextConfig) break;
    jumpConfigs.push(nextConfig);
    currentConfig = nextConfig;
  }

  if (jumpConfigs.length > 0) {
    consola.info(`Starting multi-jump proxy connection for ${environment}...`);
    connectThroughJump(jumpConfigs, onReady, serverConfig);
  } else {
    const directClient = new Client();
    consola.info(`Connecting directly to server ${serverConfig.host}...`);
    directClient
      .on("ready", () => {
        onReady(directClient);
      })
      .connect(serverConfig);
  }
}
