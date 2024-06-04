import { defineCommand, runMain as _runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "simm",
    version: "1.0.0",
    description: "Simple deploy like pm2",
  },
  subCommands: {
    sftp: () => import("./commands/sftp").then((r) => r.default),
    deploy: () => import("./commands/deploy").then((r) => r.default),
  },
});

export const runMain = () => _runMain(main);
