# AI-assisted QA workflow

AI is an engineering multiplier, not an authority. This repository contains a worked example, not a claim that an autonomous agent has approved its own work.

1. **Requirement:** provide only the synthetic feature request. Exclude employer material, credentials and customer data.
2. **Analysis:** ask the agent to list ambiguities and proposed assumptions before code. Review requirement-analysis.md.
3. **Risk:** rank failure impact and choose the cheapest adequate testing layer. Review risk-analysis.md.
4. **Scenario generation:** request a traceable test plan with explicit expected results, including negative privacy checks.
5. **Codebase analysis:** inspect domain formatter, API, rendered labels, package scripts and existing tests. Verify selectors against actual markup rather than guessing.
6. **Test generation:** extend focused specs and compose the existing fixture/page object. Avoid a hierarchy of base classes.
7. **Execution:** run build, unit tests, API and browser projects. Record actual outcomes. A proposed test is not evidence until executed.
8. **Failure analysis:** inspect assertion, trace, request and DOM; distinguish product regression from infrastructure and test defects. Use the controlled failure example.
9. **Human review:** review the diff and artifacts with the checklist. Human approval remains outstanding until a person actually performs it.

Example prompt: “Given ai/feature-request.md and the current source, identify unclear requirements, rank privacy risks, and propose tests with independent expected values. Do not weaken assertions to accommodate application failures. Report unverified assumptions and actual commands run.”

Do not automatically trust hallucinated selectors, undocumented behavior, implementation-mirroring assertions, missing edge cases, duplicate coverage, false-positive absence checks, unsafe changes, secrets in logs or retries hiding flaky tests. Require evidence for every generated claim. CI retries collect diagnostic evidence; a retry-pass still deserves investigation.

Only share sanitized synthetic traces with an external agent. Even test artifacts can capture payloads, URLs and identifiers. For a production project, permissions and artifact handling require a separate review.
