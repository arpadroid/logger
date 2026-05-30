import chalk from 'chalk';
import colors from '../colors.js';

/**
 * Returns a styled heading log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function headingLog(text) {
    return chalk.bold.hex(colors.paleCyan)(text);
}

/**
 * Returns a styled muted log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function mutedLog(text) {
    return chalk.hex(colors.mediumGray)(text);
}

/**
 * Returns a styled highlight log text.
 * @param {string} text - The text to style.
 * @returns {string} - The styled text.
 */
export function highlightLog(text) {
    return chalk.bold(text);
}
