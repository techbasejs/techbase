import { createVitest } from "vitest/node";

export async function testPackage(packageName: string) {
  console.log(":: starting test package", packageName);
  const vitest = await createVitest("test", {
    watch: false,
    ui: false,
    dir: "packages/" + packageName,
  });

  await vitest.start();

  await vitest.close();
}
