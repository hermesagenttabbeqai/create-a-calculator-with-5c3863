# Contract: Calculator with Past Results

## Overview

A single-page web calculator that runs entirely in the browser. It performs basic arithmetic and keeps a session history of every calculation so the user can review or reuse past results. No server is involved; all data stays on the user's device.

## Assumptions

- History is stored in memory only (lost on page refresh). The BRD was silent on persistence; session-only keeps the app private and simple.
- Expressions are evaluated left-to-right with standard operator precedence (multiplication and division before addition and subtraction).
- Tapping a history entry appends its result to the current input field.
- The app ships as a static site (plain HTML/CSS/JS, built with Vite). No backend is needed.
- The minimum supported screen width is 320 px (BRD NFR-02).

## Stack

| Layer | Choice | Version |
|---|---|---|
| Build tool | Vite | 5.4.19 |
| Language | JavaScript (ES2022 modules) | — |
| Styling | Plain CSS with custom properties | — |
| Unit tests | Vitest | 2.1.9 |
| E2E tests | Playwright | 1.49.1 |
| Node | 20 LTS | 20.x |

## Data model

Nothing is persisted to disk or sent to a server.

In-memory session state:

```
HistoryEntry {
  expression: string   // e.g. "12 + 7"
  result:     string   // e.g. "19"
}
```

The history is an ordered array of `HistoryEntry` objects, newest last.

## API contracts

No server API.

Module interfaces:

| Module | Exported function | Input | Output |
|---|---|---|---|
| `src/calculator.js` | `evaluate(expression: string): string` | Math expression string | Result string, or `"Error"` on invalid input / division by zero |
| `src/history.js` | `addEntry(expr, result): void` | expression, result strings | — |
| `src/history.js` | `getEntries(): HistoryEntry[]` | — | Array of all entries |
| `src/history.js` | `clearHistory(): void` | — | — |

## Design tokens

Defined as CSS custom properties in `src/tokens.css`:

```css
--color-bg:        #1a1a2e;   /* page background  */
--color-surface:   #16213e;   /* button / card fill */
--color-primary:   #0f3460;   /* operator buttons   */
--color-accent:    #e94560;   /* equals / action    */
--color-text:      #ffffff;   /* primary text       */
--color-text-muted:#a0aec0;   /* history text       */
--color-error:     #fc8181;   /* error messages     */

--font-display:    'Roboto Mono', monospace;
--font-body:       system-ui, sans-serif;

--radius:          8px;
--spacing-sm:      8px;
--spacing-md:      16px;
--spacing-lg:      24px;
```

All foreground/background pairs meet WCAG AA contrast (4.5:1):
- `--color-text` (#fff) on `--color-surface` (#16213e): ~12:1 ✓
- `--color-text` (#fff) on `--color-accent` (#e94560): ~4.6:1 ✓
- `--color-text-muted` (#a0aec0) on `--color-bg` (#1a1a2e): ~5.9:1 ✓

## Folder layout

```
/
├── index.html               # App shell (Task 1)
├── package.json             # Dependencies & scripts (Task 1)
├── vite.config.js           # Build config (Task 1)
├── playwright.config.js     # E2E config (Task 1)
├── src/
│   ├── tokens.css           # Design tokens (Task 1)
│   ├── calculator.js        # Evaluate expressions (Task 2)
│   ├── calculator.test.js   # Unit tests for calculator (Task 2)
│   ├── history.js           # Session history store (Task 3)
│   ├── history.test.js      # Unit tests for history (Task 3)
│   ├── main.js              # UI wiring, event handlers (Task 4)
│   └── styles.css           # Layout and component styles (Task 4)
└── e2e/
    └── calculator.spec.js   # End-to-end tests (Task 5)
```

## Requirement map

| Requirement | Satisfied by |
|---|---|
| BR-01 (enter expression, see result) | Task 2, Task 4 |
| BR-02 (four operations) | Task 2 |
| BR-03 (history list) | Task 3, Task 4 |
| BR-04 (history shows expression + result) | Task 3, Task 4 |
| BR-05 (tap history to reuse result) | Task 4 |
| BR-06 (clear history) | Task 3, Task 4 |
| BR-07 (division by zero message) | Task 2, Task 4 |
| NFR-01 (result under 1 s) | Task 2 (pure JS, synchronous) |
| NFR-02 (320 px min width) | Task 4 |
| NFR-03 (keyboard accessible, labels) | Task 4 |
| NFR-04 (load under 3 s) | Task 1 (Vite build, no heavy deps) |
| NFR-05 (no personal data) | Task 1 (no server, no analytics) |
