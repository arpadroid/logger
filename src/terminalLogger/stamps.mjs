import chalk from 'chalk';
import colors from '../colors.js';

export const rollupStamp = chalk.bgHex(colors.rollupLogoRed).white.bold('RJS');

export const typescriptStamp = chalk.bgHex(colors.typescriptBlue).white.bold('TS');

export const cssStamp = chalk.bgHex(colors.cssBlue).white.bold('CSS');
