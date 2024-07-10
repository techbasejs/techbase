import { packageNames } from "../package-names";
import { testPackage } from "./test-package";

export async function testAllPackages(argv: any) {
  for (const packageName of packageNames) {
    testPackage(packageName, argv);
  }
}
