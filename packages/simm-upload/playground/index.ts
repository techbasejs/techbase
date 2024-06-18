import { simmUpload } from "../src/index";
const { renameFile } = simmUpload();
const originalFile = new File(["content"], "nhatq.txt", {
    type: "text/plain",
    lastModified: Date.now(),
});
const newName = "quangnhatq2000.txt";
renameFile(originalFile, newName);