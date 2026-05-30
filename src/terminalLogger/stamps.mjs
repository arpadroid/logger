import chalk from 'chalk';
import colors from '../colors.js';

export const rollupStamp = chalk.bgHex(colors.rollupLogoRed).white.bold('RJS');

export const typescriptStamp = chalk.bgHex(colors.typescriptBlue).white.bold('TS ');

export const cssStamp = chalk.bgHex(colors.cssLogo).white.bold('CSS');

export const bashStamp = chalk.bgHex(colors.darkGray).bold.hex(colors.lightGray)('$_ ');

export const jsStamp = chalk.bgHex(colors.yellow).black.bold('JS ');
