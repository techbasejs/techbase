import fs from "node:fs";
import { resolve } from "pathe";
import { NginxConfFile } from "nginx-conf";
import shell from "shelljs";
import { execa, $ } from "execa";
import { installNginx, restartNginx } from "../libs/os";
type NginxActionOptions = {
  configFile?: string;
};

export const NginxAction = (options?: NginxActionOptions) => {
  console.log("Install nginx");
  const configFile = options?.configFile as string;

  return {
    execute: (workDir: string) => {
      if (configFile) {
        const workDirPath = resolve(workDir);
        const includePath = resolve(workDir, ".simm/nginx/*.conf");
        addInclude();

        fs.mkdirSync(resolve(workDirPath, ".simm/nginx"), { recursive: true });
        installNginx();
        restartNginx();
      }
    },
  };
};

function addInclude() {
  const path = "/etc/nginx/nginx.conf";
  const newInclude = "include /etc/nginx/extra.conf;\n";

  // Read the current Nginx configuration file
  try {
    // Read the current Nginx configuration file
    const data = shell.cat(path);

    const modifiedData = data.replace(/(http\s*{)/, `$1\n    ${newInclude}`);
    console.log(modifiedData);
  } catch (error) {
    console.error("Error modifying Nginx configuration:", error);
  }
}
