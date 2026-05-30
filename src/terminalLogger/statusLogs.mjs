import chalk from 'chalk';
import colors from '../colors.js';

/**
 * Returns a styled warning log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function warningLog(text) {
    return chalk.hex(colors.yellow)(text);
}

/**
 * Returns a styled info log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function infoLog(text) {
    return chalk.hex(colors.lightBlue)(text);
}

/**
 * Returns a styled error log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function errorLog(text) {
    return chalk.bold.hex(colors.red)(text);
}

/**
 * Returns a styled success log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function successLog(text) {
    return chalk.bold.hex(colors.lightGreen)(text);
}

/**
 * Logs an error message with an optional payload.
 * @param {string} text
 * @param {*} [payload]
 */
export function logError(text, payload) {
    console.error(`🚫 ${errorLog(text)}`, payload);
}

/**
 * Logs a success message.
 * @param {string} text
 */
export function logSuccess(text) {
    console.log(`✅ ${successLog(text)}`);
}

/**
 * Logs an informational message.
 * @param {string} text
 */
export function logInfo(text) {
    console.log(`ℹ️  ${infoLog(text)}`);
}

/**
 * Logs a warning message.
 * @param {string} text
 */
export function logWarning(text) {
    console.warn(`⚠️ ${warningLog(text)}`);
}
