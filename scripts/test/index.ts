import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { testPackage } from "./test-package";
import { testAllPackages } from "./test-all-packages";
const { argv } = yargs(hideBin(process.argv)) as any;

async function main() {
  if (argv._[0] === "all") {
    await testAllPackages(argv);
  } else if (argv._[0]) {
    for (const item of argv._) {
      await testPackage(item, argv);
    }
  }
}

main();
