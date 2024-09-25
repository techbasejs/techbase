import { describe, beforeEach, expect, it } from "vitest";
import { SimmUploader } from "../src/simm-upload";

describe("SimmUploader", () => {
  let uploader: SimmUploader;

  beforeEach(() => {
    uploader = new SimmUploader();
  });

  it("should add valid image files", () => {
    const imageFile1 = new File(["image content"], "image1.png", {
      type: "image/png",
    });
    const imageFile2 = new File(["image content"], "image2.jpg", {
      type: "image/jpeg",
    });
    const files = [imageFile1, imageFile2];

    const evt = { preventDefault: () => {} } as Event;

    uploader.addFiles(files, evt);

    expect(uploader["uploadedFiles"]).toEqual(files);
  });

  it("should reject empty image files", () => {
    const emptyImageFile = new File([], "empty.png", { type: "image/png" });
    const files = [emptyImageFile];

    const evt = { preventDefault: () => {} } as Event;

    uploader.addFiles(files, evt);

    expect(uploader["uploadedFiles"]).toHaveLength(0);
    expect(uploader["uploadedFiles"]).not.toContain(emptyImageFile);
  });

  it("should reject duplicate image files", () => {
    const imageFile1 = new File(["image content"], "image1.png", {
      type: "image/png",
    });
    const imageFile2 = new File(["image content"], "image1.png", {
      type: "image/png",
    });

    uploader.addFiles([imageFile1], {
      preventDefault: () => {},
    } as Event);

    const evt = { preventDefault: () => {} } as Event;
    uploader.addFiles([imageFile2], evt);

    expect(uploader["uploadedFiles"]).toHaveLength(1);
    expect(uploader["uploadedFiles"]).toContain(imageFile1);
    expect(uploader["uploadedFiles"]).not.toContain(imageFile2);
  });

  it("should handle mixed file cases with images", () => {
    const validImageFile = new File(["image content"], "valid.png", {
      type: "image/png",
    });
    const emptyImageFile = new File([], "empty.png", { type: "image/png" });
    const duplicateImageFile = new File(["image content"], "valid.png", {
      type: "image/png",
    });

    const evt = { preventDefault: () => {} } as Event;

    uploader.addFiles(
      [validImageFile, emptyImageFile, duplicateImageFile],
      evt,
    );

    expect(uploader["uploadedFiles"]).toHaveLength(1);
    expect(uploader["uploadedFiles"]).toContain(validImageFile);
    expect(uploader["uploadedFiles"]).not.toContain(emptyImageFile);
    expect(uploader["uploadedFiles"]).not.toContain(duplicateImageFile);
  });
});
