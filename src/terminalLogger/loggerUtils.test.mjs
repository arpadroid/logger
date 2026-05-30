import { describe, test, expect, jest } from '@jest/globals';
import { clearLast } from './loggerUtils.js';

describe('loggerUtils', () => {
    test('clearLast calls stdout cursor methods', () => {
        const originalMoveCursor = process.stdout.moveCursor;
        const originalClearLine = process.stdout.clearLine;
        const moveCursor = /** @type {typeof process.stdout.moveCursor} */ (jest.fn(() => true));
        const clearLine = /** @type {typeof process.stdout.clearLine} */ (jest.fn(() => true));
        process.stdout.moveCursor = moveCursor;
        process.stdout.clearLine = clearLine;

        clearLast();

        expect(moveCursor).toHaveBeenCalledWith(0, -1);
        expect(clearLine).toHaveBeenCalledWith(1);

        process.stdout.moveCursor = originalMoveCursor;
        process.stdout.clearLine = originalClearLine;
    });
});
