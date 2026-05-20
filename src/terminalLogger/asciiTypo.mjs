/* eslint-disable security/detect-non-literal-fs-filename */
/**
 * @typedef {import('../types.js').AsciiFontRecordType} AsciiFontRecordType
 * @typedef {import('../types.js').GetAsciiTextConfigType} GetAsciiTextConfigType
 */
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/** @type {AsciiFontRecordType} */
export const FONTS = {
    tmplr: {
        fontName: 'tmplr',
        fontPath: path.join(__dirname, 'fonts', 'tmplr.flf')
    }
};

/**
 * Given any text, it returns it in ascii format using the 'tmplr' font.
 * @param {string} text
 * @param {GetAsciiTextConfigType} [config]
 * @returns {string}
 */
export function getAsciiText(text, config = {}) {
    const { fontKey = 'tmplr' } = config;
    if (!text) return '';
    const { fontName, fontPath } = FONTS[fontKey] || FONTS.tmplr;
    text = text.replace('-', ' ');

    const fontData = fs.readFileSync(fontPath, 'utf8');
    figlet.parseFont(fontName, fontData);

    return figlet
        .textSync(String(text), {
            font: fontName,
            horizontalLayout: 'fitted',
            verticalLayout: 'default'
        })
        .trimEnd();
}
