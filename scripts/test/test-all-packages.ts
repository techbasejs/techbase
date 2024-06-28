import { packageNames } from "../package-names";
import { testPackage } from "./test-package";

export async function testAllPackages() {
  for (const packageName of packageNames) {
    testPackage(packageName);
  }
}
