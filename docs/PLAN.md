# Plan: Calculator with Past Results

## Task 1: Project scaffold and configuration

- assignee: claude
- requirements: NFR-04, NFR-05
- files: index.html, package.json, vite.config.js, playwright.config.js, src/tokens.css
- branch: feature/scaffold
- done when: `npm install` runs without errors and `npm run build` produces a `dist/` folder. Design tokens are defined in `src/tokens.css`.

## Task 2: Expression evaluator module

- assignee: claude
- requirements: BR-01, BR-02, BR-07, NFR-01
- files: src/calculator.js, src/calculator.test.js
- branch: feature/calculator
- done when: `evaluate(expression)` returns the correct numeric result as a string for addition, subtraction, multiplication, and division, and returns `"Error: Division by zero"` when dividing by zero. All unit tests pass.

## Task 3: Session history store module

- assignee: devin
- requirements: BR-03, BR-04, BR-06
- files: src/history.js, src/history.test.js
- branch: feature/history
- done when: `addEntry`, `getEntries`, and `clearHistory` work as specified in `docs/CONTRACT.md`. All unit tests pass.

Note for Devin: implement `src/history.js` with three exports exactly as described in `docs/CONTRACT.md` (section "API contracts"). `HistoryEntry` is a plain object `{ expression: string, result: string }`. History lives in a module-level array. Write `src/history.test.js` with Vitest covering: adding entries, getting all entries in order, and clearing. Do not touch any other file.

## Task 4: UI and event wiring

- assignee: claude
- requirements: BR-01, BR-03, BR-04, BR-05, BR-06, BR-07, NFR-02, NFR-03
- files: src/main.js, src/styles.css
- branch: feature/ui
- done when: The calculator renders in a browser. The user can type and submit expressions with the keyboard. Past results appear in a scrollable list. Clicking a history entry appends its result to the input. A "Clear history" button empties the list. Division by zero shows the error string inline. All elements have ARIA labels. Layout works at 320 px width.

## Task 5: End-to-end tests

- assignee: claude
- requirements: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, NFR-02, NFR-03
- files: e2e/calculator.spec.js
- branch: feature/e2e-tests
- done when: Playwright tests cover: correct result display, history list update after calculation, reuse of a history entry, clear history, division-by-zero message, and keyboard-only navigation. All tests pass against `npm run build` output.
