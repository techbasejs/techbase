import { isFileTypeAccepct } from "../src/index";
import { describe, expect, it } from "vitest";

describe("isFileTypeAccepct function", () => {
  const fileFormats = [
    "docx",
    "doc",
    "xlsx",
    "xls",
    "pptx",
    "ppt",
    "pdf",
    "txt",
    "jpeg",
    "jpg",
    "png",
    "gif",
    "bmp",
    "svg",
    "mp3",
    "wav",
    "aac",
    "flac",
    "ogg",
    "mp4",
    "avi",
    "mkv",
    "mov",
    "wmv",
    "gif",
    "webp",
    "obj",
    "fbx",
    "glb",
    "gltf",
    "csv",
    "json",
    "sql",
    "xml",
    "sqlite",
    "py",
    "java",
    "cpp",
    "h",
    "html",
    "css",
    "js",
  ];

  const createMockFile = (name: string): File => {
    return {
      name: name,
      lastModified: Date.now(),
      webkitRelativePath: "",
      size: 1024,
      type: "application/octet-stream",
    } as File;
  };

  it("should return true for valid file types", () => {
    const file = createMockFile("document.pdf");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(true);
  });

  it("should return false for invalid file types", () => {
    const file = createMockFile("image.tiff");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(false);
  });

  it("should return false for files without extension", () => {
    const file = createMockFile("myfile");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(false);
  });

  it("should return false for files with non-matching extensions", () => {
    const file = createMockFile("document.invalid");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(false);
  });

  it("should return true for uppercase file extensions", () => {
    const file = createMockFile("image.PNG");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(true);
  });

  it("should return false for uppercase file extensions that are not in the list", () => {
    const file = createMockFile("image.TIFF");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(false);
  });

  it("should return false for file names without extensions", () => {
    const file = createMockFile("README");
    expect(isFileTypeAccepct(file, fileFormats)).toBe(false);
  });
});
