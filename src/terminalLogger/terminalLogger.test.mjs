import { describe, test, expect, jest } from '@jest/globals';
import { logArpadroidProject, log, logStyle } from './terminalLogger.mjs';

describe('terminalLogger methods', () => {
    test('logArpadroid writes to console.log', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        logArpadroidProject('test project');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test('arpadroid ASCII helpers return strings', () => {
        expect(logArpadroidProject()).toEqual(expect.stringContaining('┓'));
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

    test('logList logs with spacing by default', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        log.list(['one', 'two']);

        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy.mock.calls[0][0]).toBe('\n');
        expect(spy.mock.calls[1][0]).toContain('• one');
        expect(spy.mock.calls[1][0]).toContain('• two');
        expect(spy.mock.calls[2][0]).toBe('\n');

        spy.mockRestore();
    });

    test('logList logs without spacing and custom bullet', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        log.list(['alpha', 'beta'], { bullet: '-', spaceOut: false });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toContain('- alpha');
        expect(spy.mock.calls[0][0]).toContain('- beta');

        spy.mockRestore();
    });
});
