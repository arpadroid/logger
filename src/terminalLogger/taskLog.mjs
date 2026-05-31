/* eslint-disable security/detect-non-literal-fs-filename */
/**
 * @typedef {import('../types.js').TaskLogConfigType} TaskLogConfigType
 */

import chalk from 'chalk';
import colors from '../colors.js';
import { formatBytes } from '@arpadroid/tools-iso';
import * as stamps from './stamps.mjs';
import { statSync } from 'fs';

//////////////////////////////
// #region Task Log Styles
/////////////////////////////

/**
 * Returns a styled subject log text.
 * @param {string} text
 * @returns {string}
 */
export function subjectLog(text) {
    return chalk.hex(colors.lightBlue)(text);
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

// #endregion

/**
 * Returns a progress icon string.
 * @returns {string}
 */
export function getProgressIcon() {
    return '▰▱▱▱';
}

/**
 * Returns a completed progress icon string.
 * @returns {string}
 */
export function getDoneProgressIcon() {
    return '▰▰▰▰ ✓';
}
/**
 * Returns a styled duration log text.
 * @param {number} startTime
 * @param {TaskLogConfigType} [config]
 * @returns {string}
 */
export function durationLog(startTime, config = {}) {
    const { timingThresHolds = [5, 10, 15, 20] } = config;
    const thresholdColors = [colors.paleCyan, colors.yellowMuted, colors.orangeMuted, colors.redMuted];
    const duration = (Date.now() - startTime) / 1000;

    let color = colors.paleCyan;
    for (let i = 0; i < timingThresHolds.length; i++) {
        if (duration < timingThresHolds[i]) {
            color = thresholdColors[i];
            break;
        }
    }

    return `[⏱️  ${chalk.hex(color)(duration.toFixed(2))}s]`;
}

/**
 * Returns a styled file size log text.
 * @param {string} filePath
 * @returns {string}
 */
export function fileSizeLog(filePath) {
    const size = statSync(filePath).size;
    const formattedSize = formatBytes(size);
    return chalk.hex(colors.paleCyan)(`[💾 ${formattedSize}]`);
}

/**
 * Returns a styled task log text.
 * @param {string} text
 * @param {TaskLogConfigType} [config]
 * @returns {string}
 */
export function taskLog(text, config) {
    const {
        progressIcon = getProgressIcon(),
        progressDoneIcon = getDoneProgressIcon(),
        showProgress = Boolean(config?.promise || config?.startTime),
        startTime
    } = config || {};
    const progIcon = startTime ? progressDoneIcon : progressIcon;
    startTime && (text += ` ${durationLog(startTime, config)}`);
    showProgress && (text += ` ${progIcon}`);
    return chalk.hex(colors.paleCyan)(text);
}

/**
 * Normalizes an icon string to ensure consistent spacing in logs.
 * @param {string} icon
 * @returns {string}
 */
export function normalizeIcon(icon) {
    if (icon.length === 2) {
        icon = `${icon} `;
    } else if (icon.length === 1) {
        icon = `${icon}  `;
    } else if (icon.length === 0) {
        icon = `${icon}   `;
    }
    return icon;
}

/**
 * Returns a styled task subject text.
 * @param {string} text
 * @param {TaskLogConfigType} [config]
 * @returns {string}
 */
export function taskSubjectLog(text, config = {}) {
    const { symbolColor = colors.darkNeon } = config;
    const { separator = chalk.hex(symbolColor)(':'), paddingSymbol = chalk.hex(symbolColor)('-') } = config;
    let { icon = stamps.bashStamp } = config;
    icon = normalizeIcon(icon);
    const padSize = 12;
    const padding = padSize - text.length;
    const padString = (padding > 0 && paddingSymbol.repeat(padding)) || '';
    const opening = chalk.hex(symbolColor)('[');
    const closing = chalk.hex(symbolColor)(']');
    const arrow = chalk.hex(symbolColor)('->');
    const subjectString = `${opening}${depLog(text)}${closing}`;
    return `${padString}${subjectString}${separator} ${icon}${arrow}`;
}

/**
 * Logs a task with a subject and text.
 * @param {string} subject
 * @param {string} text
 * @param {TaskLogConfigType} [config]
 * @returns {void | ((value?: unknown) => void)}
 */
export function logTask(subject, text, config = {}) {
    let { promise } = config;

    console.log(taskSubjectLog(subject, config), taskLog(text, config));
    if (!promise && !config.doneMessage) return;
    /**
     * A function to resolve the task completion promise.
     * @type {(value?: unknown) => void}
     */
    let resolvePromise = () => {};
    if (!promise) {
        promise = new Promise(resolve => (resolvePromise = resolve));
    }
    const { startTime = Date.now() } = config;
    promise.then(() => {
        let doneMessage = config.doneMessage || '';
        if (typeof doneMessage === 'function') {
            doneMessage = doneMessage();
        }
        logTask(subject, doneMessage, {
            ...config,
            startTime,
            promise: undefined
        });
    });
    return resolvePromise;
}
