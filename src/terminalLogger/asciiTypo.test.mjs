import { describe, test, expect } from '@jest/globals';
import { getAsciiText } from './asciiTypo.mjs';

describe('asciiTypo', () => {
    test('returns empty string when input is empty', () => {
        expect(getAsciiText('')).toBe('');
    });

    test('replaces hyphen with space in output generation path', () => {
        const result = getAsciiText('hello-world');
        expect(result).toContain('┓');
    });

    test('falls back to default font for unknown font key', () => {
        const result = getAsciiText('hello', { fontKey: 'does-not-exist' });
        expect(result).toContain('┓');
    });
});
