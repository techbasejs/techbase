import { installNginx } from "../libs/os";

export const Pm2Action = (options?: any) => {
  console.log("Install nginx");
  return {
    execute: () => {
      installNginx();
    },
  };
};
