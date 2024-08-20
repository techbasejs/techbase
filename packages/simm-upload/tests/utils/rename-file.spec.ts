import { describe, it, expect } from "vitest";
import { renameFile } from "../../src/rename-file";

interface FileOptions {
  lastModified?: number;
  type?: string;
}

global.File = function (fileBits, fileName, options: FileOptions = {}) {
  this.name = fileName;
  this.lastModified = options.lastModified || Date.now();
  this.type = options.type || "";
  this.size = fileBits.reduce((acc, curr) => acc + curr.length, 0);

  this.arrayBuffer = async () => new ArrayBuffer(this.size);
  this.slice = (start, end, contentType) =>
    new Blob(fileBits.slice(start, end), { type: contentType });
  this.stream = () => new ReadableStream();
  this.text = async () => fileBits.join("");
} as any;

describe("simmUpload", () => {
  it("should rename the file without timestamp", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "newName.txt";
    const newFile = renameFile(file, newName);

    expect(newFile.name).toBe(newName);
    expect(newFile.type).toBe(file.type);
    expect(newFile.lastModified).toBe(file.lastModified);
  });

  it("should rename the file with timestamp", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "newName.txt";
    const newFile = renameFile(file, newName, true);

    expect(newFile.name.startsWith(newName)).toBe(true);
    expect(newFile.name).not.toBe(newName);
    expect(newFile.type).toBe(file.type);
    expect(newFile.lastModified).toBe(file.lastModified);
  });

  it("should not rename the file if hasTimestamp is false", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "newName.txt";
    const newFile = renameFile(file, newName, false);

    expect(newFile.name).toBe(newName);
    expect(newFile.type).toBe(file.type);
    expect(newFile.lastModified).toBe(file.lastModified);
  });
});
