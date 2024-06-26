import { createVitest } from "vitest/node";

(async () => {
  const vitest = await createVitest("test", {
    watch: true,
    ui: true,
  });
  vitest?.start();
})();
