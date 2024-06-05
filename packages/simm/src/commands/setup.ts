import { defineCommand } from "citty";
import { resolve } from "pathe";
import { createResolver } from "../_resolver";
import { SimmConfig } from "../types";

export default defineCommand({
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
    update: {
      type: "boolean",
      required: false,
      default: false,
      description: "force update config of an action",
    },
  },
  async run({ args }) {
    const { workDir, environment } = args;
    const resolver = await createResolver();
    const configPath = resolve(workDir, `simm.config.ts`);
    const simmConfig: SimmConfig = await resolver.import(configPath);
    const setupConfig = simmConfig.servers[environment]?.setup;
    if (!setupConfig?.actions) {
      return;
    }

    for (const action of setupConfig.actions) {
      action.execute?.(workDir);
    }
  },
});
