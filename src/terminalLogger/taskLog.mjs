import chalk from 'chalk';
import colors from '../colors.js';

/**
 * Returns a styled subject log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function subjectLog(text) {
    return chalk.hex(colors.lightBlue)(text);
}

/**
 * Returns a styled task log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function taskLog(text) {
    return chalk.hex(colors.paleCyan)(text);
}

/**
 * Returns a styled package log text.
 * @param {string} text
 * @returns {string}
 */
export function pkgLog(text) {
    return chalk.bold.underline.hex(colors.lightBlue)(text);
}

/**
 * Returns a styled dependency log text.
 * @param {string} text
 * @returns {string}
 */
export function depLog(text) {
    return chalk.bold.underline.hex(colors.lightViolet)(text);
}

/**
 * Returns a styled task subject text.
 * @param {string} text
 * @param {string} prefix
 * @returns {string}
 */
export function taskSubjectLog(text, prefix = '@arpadroid/') {
    return `[${subjectLog(prefix)}${depLog(text)}] =>`;
}

/**
 * Logs a task with a subject and text.
 * @param {string} subject
 * @param {string} text
 */
export function logTask(subject, text) {
    console.log(taskSubjectLog(subject), taskLog(text));
}
