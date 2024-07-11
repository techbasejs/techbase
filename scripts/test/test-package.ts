import { createVitest } from 'vitest/node';

export async function testPackage(packageName: string, argv: any) {
  console.log(":: starting test package", packageName);
  const vitest = await createVitest("test", {
    watch: false,
    ui: false,
    dir: "packages/" + packageName,
    coverage: {
      provider: "istanbul",
      enabled: argv.coverage,
      include: ['**/src/**/*.ts',],
    },
    environment: argv.environment,
  });

  await vitest.start();
  
  await vitest.close();
}
