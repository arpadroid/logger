import { describe, test, expect, jest } from '@jest/globals';
import { errorLog, infoLog, logError, logInfo, logSuccess, logWarning, successLog, warningLog } from './statusLogs.mjs';

describe('statusLogs styles', () => {
    test('style helpers return strings containing text', () => {
        const text = 'Hello';
        expect(errorLog(text)).toEqual(expect.stringContaining(text));
        expect(successLog(text)).toEqual(expect.stringContaining(text));
        expect(warningLog(text)).toEqual(expect.stringContaining(text));
        expect(infoLog(text)).toEqual(expect.stringContaining(text));
    });
});

describe('statusLogs methods', () => {
    test('logError writes to console.error', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        logError('Boom', { ok: false });
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toEqual(expect.stringContaining('🚫'));
        spy.mockRestore();
    });

    test('logSuccess writes to console.log', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        logSuccess('All good');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test('logInfo writes to console.log', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        logInfo('Info');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test('logWarning writes to console.warn', () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
        logWarning('Heads up');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
