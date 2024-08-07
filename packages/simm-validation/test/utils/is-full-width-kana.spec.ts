import { isFullWidthKana } from "../../src";
import { describe, it, expect } from "vitest";

describe('isFullWidthKana', () => {
  it('should return true for only full-width katakana characters, Japanese spaces, and Japanese punctuation marks', () => {
    expect(isFullWidthKana('ァヶー・')).to.be.true;
  });

  it('should return false for non-katakana characters', () => {
    expect(isFullWidthKana('abc')).to.be.false;
  });

  it('should return false for empty string', () => {
    expect(isFullWidthKana('')).to.be.false;
  });

  it('should return false for null', () => {
    expect(isFullWidthKana(null as never)).to.be.false;
  });

  it('should return false for undefined', () => {
    expect(isFullWidthKana(undefined as never)).to.be.false;
  });

  it('should return false for a string containing both full-width and half-width spaces', () => {
    expect(isFullWidthKana('　 ')).to.be.false;
  });

  it('should return false for a string containing both full-width and half-width punctuation marks', () => {
    expect(isFullWidthKana('。.')).to.be.false;
  });

  it('should return false for a string containing only half-width spaces', () => {
    expect(isFullWidthKana(' ')).to.be.false;
  });

  it('should return false for a string containing only half-width punctuation marks', () => {
    expect(isFullWidthKana('.')).to.be.false;
  });

  it('should return false for a mix of Japanese and English characters', () => {
    expect(isFullWidthKana('アイウエオabc')).toBe(false);
  });

  it('should return false for a mix of Japanese characters and numbers', () => {
    expect(isFullWidthKana('アイウエオ123')).toBe(false);
  });

  it('should return false for a mix of Japanese characters and special characters', () => {
    expect(isFullWidthKana('アイウエオ!@#$%^&*()_+-=[]{}|')).toBe(false);
  });

  it('should return false for a mix of English characters and numbers', () => {
      expect(isFullWidthKana('abc123')).toBe(false);
  });
});
