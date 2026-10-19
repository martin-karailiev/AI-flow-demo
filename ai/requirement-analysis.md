# Requirement analysis and recorded decisions

AI can expose missing requirements, but it cannot silently choose product policy. These are explicit demo assumptions for a human to review.

| Question                                   | Decision for this demo                                                                                                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Where does credential information belong?  | Details only; list has no credential field.                                                                                                                                 |
| What does masking mean?                    | Prefix four asterisks; show final four characters only when ID length exceeds four. Shorter IDs are fully masked.                                                           |
| What counts as an alias?                   | Trimmed nonempty text. An alias containing the full ID falls back to masking.                                                                                               |
| Missing credential or identifier?          | Display Unavailable for RFID.                                                                                                                                               |
| Revoked credential?                        | Append (revoked) to either alias or mask.                                                                                                                                   |
| Unknown or absent status?                  | Append (status unknown); never imply ACTIVE.                                                                                                                                |
| Credential attached to a non-RFID session? | Ignore it in the UI.                                                                                                                                                        |
| Missing station?                           | Display Unknown station.                                                                                                                                                    |
| Session status?                            | endedAt means Completed; otherwise In progress. Independent of credential status.                                                                                           |
| Timezone?                                  | All displayed timestamps use UTC.                                                                                                                                           |
| What is the privacy boundary?              | Raw credential IDs must not occur in rendered DOM, including hidden attributes. The synthetic REST response contains IDs; this demo does not promise network-level secrecy. |

Scope: incomplete optional fields, not arbitrary hostile JSON of every possible type. Authentication, authorization, billing, persistent storage and production telemetry are deliberately absent. A real service would need a separately reviewed data-minimization and access-control design.
