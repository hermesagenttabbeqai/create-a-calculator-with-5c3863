# Business Requirements: Calculator with Past Results

## Goal

A calculator that lets anyone do basic math quickly on any device. It keeps a history of past calculations so users can review or reuse earlier results without having to redo them.

## Users

Anyone who needs to do quick arithmetic — students, shoppers, professionals — on a phone, tablet, or desktop browser.

## Business requirements

| ID    | Requirement |
|-------|-------------|
| BR-01 | The user can enter a math expression and see the result immediately. |
| BR-02 | The calculator supports addition, subtraction, multiplication, and division. |
| BR-03 | The calculator shows the full history of past calculations in the current session. |
| BR-04 | Each history entry shows the expression and its result. |
| BR-05 | The user can tap a past result to insert it into the current expression. |
| BR-06 | The user can clear the history with a single action. |
| BR-07 | The calculator prevents division by zero and shows a clear message when it happens. |

## Quality requirements

- NFR-01: The result appears in under 1 second after the user submits an expression.
- NFR-02: The interface works correctly on screens as small as 320 px wide (small phones).
- NFR-03: All interactive controls are reachable by keyboard and have visible labels for screen readers.
- NFR-04: The app loads in under 3 seconds on a standard mobile connection.
- NFR-05: No personal data is collected or sent to any server.

## Not included

- User accounts or saved history across devices.
- Scientific or programming functions (square root, exponents, hex, etc.).
- Currency conversion or unit conversion.
- Offline/installable (PWA) mode.

## Decisions

- History is kept only for the current browser session (not stored permanently). Reason: the user did not mention persistence, and session-only history keeps the app simple and private.
- The app is a web application accessible from any browser. Reason: covers all devices without requiring an install.
