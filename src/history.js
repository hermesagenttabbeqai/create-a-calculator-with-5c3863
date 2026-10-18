/** @type {{ expression: string, result: string }[]} */
let entries = [];

/**
 * Adds a new HistoryEntry to the end of the history array.
 * @param {string} expr
 * @param {string} result
 */
export function addEntry(expr, result) {
  entries.push({ expression: expr, result: result });
}

/**
 * Returns a copy of all entries in insertion order (oldest first).
 * @returns {{ expression: string, result: string }[]}
 */
export function getEntries() {
  return entries.map((e) => ({ ...e }));
}

/**
 * Empties the history array.
 */
export function clearHistory() {
  entries = [];
}
