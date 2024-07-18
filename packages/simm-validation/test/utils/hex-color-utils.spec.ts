import { describe, expect, it } from 'vitest';
import { isHexColor } from './../../src/is-hex-color';

describe('isHexColor', () => {
  it('should return true for valid hex colors', () => {
    expect(isHexColor('#ffcc00')).toBe(true);
    expect(isHexColor('ffcc00')).toBe(true);
    expect(isHexColor('#abc')).toBe(true);
    expect(isHexColor('#abcdef')).toBe(true);
  });

  it('should return false for invalid hex colors', () => {
    expect(isHexColor('#gggggg')).toBe(false);
    expect(isHexColor('#12345')).toBe(false);
    expect(isHexColor('#abcdefg')).toBe(false);
    expect(isHexColor('')).toBe(false);
  });
});

