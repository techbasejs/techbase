import { installNginx } from "../libs/os";

export const GitAction = (options?: any) => {
  console.log("Install nginx");
  return {
    execute: () => {
      installNginx();
    },
  };
};
