import chalk from 'chalk';
import { getAsciiText } from './asciiTypo.mjs';
import { clearLast } from './loggerUtils.js';
import { depLog, logTask, pkgLog, subjectLog, taskLog, taskSubjectLog } from './taskLog.mjs';
import { errorLog, infoLog, logError, logInfo, logSuccess, logWarning } from './statusLogs.mjs';
import { successLog, warningLog } from './statusLogs.mjs';
import { headingLog, highlightLog, mutedLog } from './logStyles.mjs';
import colors from '../colors.js';

/**
 * Logs the Arpadroid ASCII art.
 * @param {string} [projectName]
 * @param {string} [prefix]
 * @returns {string}
 */
export function logArpadroidProject(projectName = '', prefix = 'arpadroid ') {
    const text = chalk.hex(colors.arpadroidAsciiBlue)(getAsciiText(`${prefix}${projectName}`));
    console.log(text);
    return text;
}

/**
 * Logs a list of items with a specified bullet point.
 * @param {string[]} items
 * @param {{bullet?: string, spaceOut?: boolean}} [config]
 */
export function logList(items, config = {}) {
    const { bullet = '•', spaceOut = true } = config;
    spaceOut && console.log('\n');
    const out = items.map(item => `  ${bullet} ${item}`).join('\n');
    console.log(out);
    spaceOut && console.log('\n');
}

// #region Log Exports

export const log = {
    clearLast,
    error: logError,
    warning: logWarning,
    success: logSuccess,
    info: logInfo,
    task: logTask,
    arpadroid: logArpadroidProject,
    list: logList
};

export const logStyle = {
    error: errorLog,
    success: successLog,
    info: infoLog,
    task: taskLog,
    pkg: pkgLog,
    dep: depLog,
    muted: mutedLog,
    warning: warningLog,
    highlight: highlightLog,
    heading: headingLog,
    subject: subjectLog,
    taskSubject: taskSubjectLog
};
// #endregion
