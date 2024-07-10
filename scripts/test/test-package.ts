import { createVitest } from 'vitest/node';

export async function testPackage(packageName: string, argv: any) {
  console.log(":: starting test package", packageName);
  const vitest = await createVitest("test", {
    watch: argv.watch,
    ui: false,
    dir: "packages/" + packageName,
    coverage: {
      provider: "istanbul",
      enabled: argv.coverage
    },
    environment: argv.environment,
  });

  await vitest.start();
  
  if(!argv.watch) {
    await vitest.close();    
  }
}
