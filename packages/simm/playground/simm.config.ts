import fs from "node:fs";
import { read } from "rc9";
import { defineConfig } from "../src";
const config = read(".conf");

export default defineConfig({
  servers: {
    bastion: {
      username: config.bastion.user,
      host: config.bastion.host,
      port: config.bastion.port,
      password: config.bastion.password,
      // deploy: {
      //   branch: 'main',
      //   repo: config.github.repo,
      //   path: config.deploy.path,
      // },
      sftp: {
        source:
          "/home/duongnt/workspace/rsdn-project/techbasejs/simm/playground/nginx.conf",
        dest: config.deploy.path,
        preSftp:
          "ls -al /home/duongnt/workspace/rsdn-project/techbasejs/simm/playground",
        postSftp:
          "ls -al /mnt/chintaidx-owner-crm-frontend/source && echo XXX && echo 333",
      },
      // privateKey: fs.readFileSync(config.server.private_key_path, "utf8"),
    },
    production: {
      username: config.production.username,
      host: config.production.host,
      password: config.production.password,
      sftp: {
        source: config.production.sftp.source,
        dest: config.production.sftp.dest,
      }
    },
  },
});
