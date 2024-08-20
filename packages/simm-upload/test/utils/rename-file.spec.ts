import { describe, it, expect } from 'vitest';
import { simmUpload } from '../../src/index';

describe('simmUpload', () => {
  const { renameFile } = simmUpload();

  it('should rename the file without timestamp', () => {
    const file = new File(['content'], 'oldName.txt', { type: 'text/plain' });
    const newName = 'newName.txt';
    const newFile = renameFile(file, newName);

    expect(newFile.name).toBe(newName);
    expect(newFile.type).toBe(file.type);
    expect(newFile.lastModified).toBe(file.lastModified);
  });

  it('should rename the file with timestamp', () => {
    const file = new File(['content'], 'oldName.txt', { type: 'text/plain' });
    const newName = 'newName.txt';
    const newFile = renameFile(file, newName, true);

    expect(newFile.name.startsWith(newName)).toBe(true);
    expect(newFile.name).not.toBe(newName);
    expect(newFile.type).toBe(file.type);
    expect(newFile.lastModified).toBe(file.lastModified);
  });

  it('should not rename the file if hasTimestamp is false', () => {
    const file = new File(['content'], 'oldName.txt', { type: 'text/plain' });
    const newName = 'newName.txt';
    const newFile = renameFile(file, newName, false);

    expect(newFile.name).toBe(newName);
    expect(newFile.type).toBe(file.type);
    expect(newFile.lastModified).toBe(file.lastModified);
  });
});
