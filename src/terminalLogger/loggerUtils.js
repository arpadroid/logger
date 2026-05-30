/**
 * Clears the last line in the terminal.
 */
export function clearLast() {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
}
