# Risk-based testing

Scores are ordinal planning aids, not measured probabilities. Impact and likelihood use 1–3.

| Risk                                     | Impact × likelihood | Priority | Evidence                                                                                                           |
| ---------------------------------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| Raw identifier rendered                  | 3 × 3 = 9           | High     | Unit boundary cases; real API-to-browser privacy checks on desktop and cross-browser coverage, including full HTML |
| Wrong credential associated with session | 3 × 2 = 6           | Medium   | API exact synthetic associations and detail/list consistency; UI alias journey                                     |
| Revoked displayed as active              | 2 × 2 = 4           | Medium   | API status, UI revoked alias/mask, unit unknown status                                                             |
| Incomplete data crashes UI               | 2 × 2 = 4           | Medium   | Incomplete seed records and browser fallbacks                                                                      |
| Navigation or server errors block user   | 2 × 2 = 4           | Medium   | Navigation, 404 and injected 503 tests                                                                             |
| Formatting inconsistencies               | 1 × 2 = 2           | Low      | Explicit UTC, semantic table, visual review                                                                        |

Unit tests explore cheap formatter boundaries. API tests verify HTTP and associations without browser cost. E2E tests protect critical visible outcomes with live integration; a route override is used only to deterministically induce 503. Every browser test has an isolated context; the API data is immutable, so parallel readers need no cleanup or shared setup state.

Not every string length/status/browser permutation needs E2E coverage. The small representative browser matrix plus unit edge cases provides more useful feedback than a combinatorial suite. Future mutable APIs would require unique per-test records and cleanup; the current read-only service does not pretend to demonstrate that lifecycle.
