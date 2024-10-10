import fs from "node:fs";
import { read } from "rc9";
import { defineConfig } from "../src";
const config = read(".conf");

export default defineConfig({
  servers: {
    // bastion: {
    //   username: config.bastion.user,
    //   host: config.bastion.host,
    //   port: config.bastion.port,
    //   password: config.bastion.password,
    //   // deploy: {
    //   //   branch: 'main',
    //   //   repo: config.github.repo,
    //   //   path: config.deploy.path,
    //   // },
    //   sftp: {
    //     source:
    //       "/home/duongnt/workspace/rsdn-project/techbasejs/simm/playground/nginx.conf",
    //     dest: config.deploy.path,
    //     preSftp:
    //       "ls -al /home/duongnt/workspace/rsdn-project/techbasejs/simm/playground",
    //     postSftp:
    //       "ls -al /mnt/chintaidx-owner-crm-frontend/source && echo XXX && echo 333",
    //   },
    //   // privateKey: fs.readFileSync(config.server.private_key_path, "utf8"),
    // },
    proxy1: {
      username: config.proxy1.user,
      host: config.proxy1.host,
      port: config.proxy1.port,
      password: config.proxy1.password,
      proxyJump: "proxy2",
    },
    proxy2: {
      username: config.proxy2.user,
      host: config.proxy2.host,
      port: config.proxy2.port,
      password: config.proxy2.password,
      proxyJump: "proxy3",
    },
    proxy3: {
      username: config.proxy3.user,
      host: config.proxy3.host,
      port: config.proxy3.port,
      password: config.proxy3.password,
      proxyJump: "proxy4",
    },
    proxy4: {
      username: config.proxy4.user,
      host: config.proxy4.host,
      port: config.proxy4.port,
      password: config.proxy4.password,
      proxyJump: "proxy5",
    },
    proxy5: {
      username: config.proxy5.user,
      host: config.proxy5.host,
      port: config.proxy5.port,
      password: config.proxy5.password,
    },
    fe: {
      username: config.production.user,
      host: config.production.host,
      port: config.production.port,
      password: config.production.password,
      proxyJump: "proxy1",
      // deploy: {
      //   branch: "main",
      //   repo: config.github.repo,
      //   path: config.deploy.path,
      //   postDeploy: "pnpm install",
      // },
    },
  },
});