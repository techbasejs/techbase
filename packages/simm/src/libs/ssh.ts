import { Client, ClientChannel, FileEntryWithStats } from "ssh2";
import { BaseResultType } from "../types";

export function SSHForwardOut(
  client: Client,
  port: number,
  host: string,
  sshPort: number,
): Promise<BaseResultType<ClientChannel>> {
  return new Promise((resolve) => {
    client.forwardOut("127.0.0.1", 8124, host, sshPort, (err, channel) => {
      if (err) {
        return resolve({ error: err });
      }
      return resolve({ result: channel });
    });
  });
}

export const SSHSftpReadDir = (
  client: Client,
  path: string,
): Promise<BaseResultType<FileEntryWithStats[]>> => {
  return new Promise((resolve) => {
    client.sftp((sftpErr, sftp) => {
      if (sftpErr) {
        return resolve({ error: sftpErr });
      }
      sftp.readdir(path, (err, list) => {
        if (err) {
          return resolve({ error: err });
        }

        return resolve({ error: err, result: list });
      });
    });
  });
};

export const SSHExec = (
  client: Client,
  commands: string[],
): Promise<BaseResultType<ClientChannel>> => {
  return new Promise((resolve) => {
    client.exec(commands.join("\n"), (err, stream) => {
      if (err) {
        return resolve({ error: err });
      }

      return resolve({ error: undefined, result: stream });
    });
  });
};
