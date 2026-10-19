# Reviewed AI-style test plan

| Requirement                                                                  | Layer and executable evidence | Tag             |
| ---------------------------------------------------------------------------- | ----------------------------- | --------------- |
| List schema, unique IDs, detail consistency                                  | tests/api/sessions.spec.ts    | @api @smoke     |
| Correct RFID association and 404                                             | tests/api/sessions.spec.ts    | @api            |
| Alias and fallback masking                                                   | tests/e2e/credentials.spec.ts | @privacy @smoke |
| Revoked alias and masked revoked ID                                          | tests/e2e/credentials.spec.ts | @privacy        |
| Non-RFID field absence                                                       | tests/e2e/credentials.spec.ts | @privacy        |
| Missing station/credential, blank alias, unknown status                      | tests/e2e/credentials.spec.ts | @resilience     |
| List → details → list                                                        | tests/e2e/navigation.spec.ts  | @smoke          |
| 404 recovery and 503 feedback                                                | tests/e2e/navigation.spec.ts  | @resilience     |
| Short IDs, alias containing ID, missing values, attached non-RFID credential | tests/unit/credential.test.ts | Unit suite      |

Assertions use fixed independently specified expected values. Tests do not import seed data or call the production formatter to calculate expectations. The privacy negative assertion follows a positive loaded-page and expected-label assertion, preventing an empty or loading page from passing accidentally.

The original plan was extended during implementation with short IDs and alias-as-ID: both can leak an identifier despite superficially correct masking. Additional coverage should follow observed risk, not generated test volume.
