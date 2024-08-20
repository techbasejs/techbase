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

describe("renameFile", () => {
  it("should rename the file without a timestamp", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "newName.txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should rename the file with a timestamp", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "newName.txt";
    const renamedFile = renameFile(file, newName, true);

    // Extract the timestamp from the filename
    const [baseName, timestamp] = renamedFile.name.split("_");
    expect(baseName).toBe(newName);

    // The timestamp should follow the format `YYYY-MM-DDTHH-MM-SS-SSSZ`
    expect(timestamp).toMatch(/^\d{4}(?:-\d{2}){2}T(?:\d{2}-){3}\d{3}Z$/);

    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should handle an empty new name", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should handle a new name with special characters", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "newName!@#$%^&*().txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should handle an empty original file name", () => {
    const file = new File(["content"], "", { type: "text/plain" });
    const newName = "newName.txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });
  it("should handle a new name with spaces", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "new Name With Spaces.txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should handle a long new name", () => {
    const file = new File(["content"], "oldName.txt", { type: "text/plain" });
    const newName = "a".repeat(255) + ".txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should handle renaming a file with an invalid type", () => {
    const file = new File(["content"], "oldName.txt", { type: "invalid/type" });
    const newName = "newName.txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe("invalid/type");
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });

  it("should handle renaming the file to the same name", () => {
    const file = new File(["content"], "sameName.txt", { type: "text/plain" });
    const newName = "sameName.txt";
    const renamedFile = renameFile(file, newName);

    expect(renamedFile.name).toBe(newName);
    expect(renamedFile.type).toBe(file.type);
    expect(renamedFile.lastModified).toBe(file.lastModified);
  });
});
