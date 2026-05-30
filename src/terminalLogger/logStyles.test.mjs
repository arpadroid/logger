import { describe, test, expect } from '@jest/globals';
import { headingLog, highlightLog, mutedLog } from './logStyles.mjs';

describe('logStyles', () => {
    test('style helpers return strings containing text', () => {
        const text = 'Hello';
        expect(headingLog(text)).toEqual(expect.stringContaining(text));
        expect(mutedLog(text)).toEqual(expect.stringContaining(text));
        expect(highlightLog(text)).toEqual(expect.stringContaining(text));
    });
});
