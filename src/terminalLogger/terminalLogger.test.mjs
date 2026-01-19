import { describe, test, expect, jest } from '@jest/globals';
import {
    headingLog,
    subjectLog,
    taskLog,
    errorLog,
    successLog,
    mutedLog,
    warningLog,
    infoLog,
    highlightLog,
    clearLast,
    logError,
    logSuccess,
    logInfo,
    pkgLog,
    depLog,
    taskSubjectLog,
    logTask,
    arpadroidLog,
    arpadroidLogBordered,
    logArpadroid,
    log,
    logStyle
} from './terminalLogger.mjs';

describe('terminalLogger styles', () => {
    test('style helpers return strings containing text', () => {
        const text = 'Hello';
        expect(headingLog(text)).toEqual(expect.stringContaining(text));
        expect(subjectLog(text)).toEqual(expect.stringContaining(text));
        expect(taskLog(text)).toEqual(expect.stringContaining(text));
        expect(errorLog(text)).toEqual(expect.stringContaining(text));
        expect(successLog(text)).toEqual(expect.stringContaining(text));
        expect(mutedLog(text)).toEqual(expect.stringContaining(text));
        expect(warningLog(text)).toEqual(expect.stringContaining(text));
        expect(infoLog(text)).toEqual(expect.stringContaining(text));
        expect(highlightLog(text)).toEqual(expect.stringContaining(text));
        expect(pkgLog(text)).toEqual(expect.stringContaining(text));
        expect(depLog(text)).toEqual(expect.stringContaining(text));
    });

    test('taskSubjectLog formats subject with prefix', () => {
        const result = taskSubjectLog('module');
        expect(result).toEqual(expect.stringContaining('module'));
        expect(result).toEqual(expect.stringContaining('@arpadroid/'));
    });
});

describe('terminalLogger methods', () => {
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

    test('logTask writes subject and text', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        logTask('module', 'Running tasks');
        expect(spy).toHaveBeenCalled();
        const callArgs = spy.mock.calls[0] || [];
        expect(String(callArgs.join(' '))).toEqual(expect.stringContaining('module'));
        spy.mockRestore();
    });

    test('arpadroid ASCII helpers return strings', () => {
        expect(arpadroidLog()).toEqual(expect.stringContaining('┓'));
        expect(arpadroidLogBordered()).toEqual(expect.stringContaining('---'));
    });

    test('logArpadroid writes to console.log', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        logArpadroid();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test('grouped exports expose expected methods', () => {
        expect(typeof log.error).toBe('function');
        expect(typeof log.success).toBe('function');
        expect(typeof log.info).toBe('function');
        expect(typeof log.task).toBe('function');
        expect(typeof log.arpadroid).toBe('function');

        expect(typeof logStyle.error).toBe('function');
        expect(typeof logStyle.success).toBe('function');
        expect(typeof logStyle.info).toBe('function');
        expect(typeof logStyle.task).toBe('function');
        expect(typeof logStyle.pkg).toBe('function');
        expect(typeof logStyle.dep).toBe('function');
        expect(typeof logStyle.muted).toBe('function');
        expect(typeof logStyle.warning).toBe('function');
        expect(typeof logStyle.highlight).toBe('function');
        expect(typeof logStyle.heading).toBe('function');
        expect(typeof logStyle.subject).toBe('function');
        expect(typeof logStyle.taskSubject).toBe('function');
    });
});
