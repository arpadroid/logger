import { describe, test, expect, jest } from '@jest/globals';
import { depLog, logTask, pkgLog, subjectLog, taskLog, taskSubjectLog } from './taskLog.mjs';

describe('taskLog styles', () => {
    test('style helpers return strings containing text', () => {
        const text = 'Hello';
        expect(subjectLog(text)).toEqual(expect.stringContaining(text));
        expect(taskLog(text)).toEqual(expect.stringContaining(text));
        expect(pkgLog(text)).toEqual(expect.stringContaining(text));
        expect(depLog(text)).toEqual(expect.stringContaining(text));
    });

    test('taskSubjectLog formats subject with prefix', () => {
        const result = taskSubjectLog('module');
        expect(result).toEqual(expect.stringContaining('module'));
        expect(result).toEqual(expect.stringContaining('@arpadroid/'));
    });
});

describe('taskLog methods', () => {
    test('logTask writes subject and text', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        logTask('module', 'Running tasks');
        expect(spy).toHaveBeenCalled();
        const callArgs = spy.mock.calls[0] || [];
        expect(String(callArgs.join(' '))).toEqual(expect.stringContaining('module'));
        spy.mockRestore();
    });
});
