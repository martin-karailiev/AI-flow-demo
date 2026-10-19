# Validation record

Executed locally on Windows with Node 22.14.0:

- TypeScript and production build passed.
- 10 unit tests passed.
- 26 Playwright tests passed: 4 API, 11 desktop Chromium, 11 mobile Chromium emulation.
- All four CI-mode shards passed locally; blob reports merged successfully into one HTML report.
- A controlled raw-ID mutation produced the intended failure (expected `****8F21`, received `ABC123458F21`). The formatter was restored and the production build and all four shards passed afterward.
- Prettier checks passed after restoration.
- npm audit reported zero known vulnerabilities at validation time.
- Development startup and a direct REST request succeeded. Desktop list and mobile details screenshots were visually reviewed.

The initial Firefox executable could not launch on this host (native Windows side-by-side / mozglue error), including with a second Playwright version. No Firefox result is claimed. The final projects deliberately cover desktop and mobile Chromium; no tests are skipped.

## Engineering review

The highest-risk privacy behavior is checked with independent expected labels and full DOM inspection. The controlled mutation confirms the assertion can fail on the intended regression. Tests exercise the real REST integration; 503 is deliberately injected. Pure function tests cover short IDs, whitespace, unknown status and an alias containing the ID. A missing table header scope found during browser validation was improved with explicit column scopes.

The suite demonstrates fixtures, page-object composition, APIRequestContext, role locators, web-first assertions, route interception, projects, tags, parallelism, CI retries, sharding and failure artifacts without unnecessary inheritance or write/reset endpoints.

Limits: CI commands were reproduced locally, but GitHub-hosted Actions execution requires publishing the repository. Authentication, persistence, mutation isolation, arbitrary JSON validation and cross-browser verification are outside this demo. Human approval is not asserted by automated validation.
