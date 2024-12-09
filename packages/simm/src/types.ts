import { ConnectConfig } from "ssh2";

export type SimmConfig = {
  servers: {
    [environment: string]: SimmServerConfig;
  };
};

export type SimmServerConfig = {
  proxyJump?: string;
  deploy?: SimmServerDeployConfig;
  sftp?: SimmServerSftpConfig;
} & ConnectConfig;

export type SimmServerDeployConfig = {
  branch?: string;
  repo?: string;
  path?: string;
  postDeploy?: string;
};

export type SimmServerSftpConfig = {
  preSftp?: string;
  source?: string;
  dest?: string;
  postSftp?: string;
  files?: SimmServerSftpFile[];
};

export type SimmServerSftpFile = {
  source: string;
  dest: string;
};

export type BaseResultType<T> = {
  error?: Error;
  result?: T;
};
