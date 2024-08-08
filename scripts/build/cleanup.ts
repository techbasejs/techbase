import path from "node:path";
import { rimrafSync } from "rimraf";
export async function cleanup(packagePath: string) {
  rimrafSync(path.join(packagePath, "cjs"));
  rimrafSync(path.join(packagePath, "esm"));
}
