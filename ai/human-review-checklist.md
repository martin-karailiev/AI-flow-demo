# Human review checklist

- [ ] Does each test validate a documented requirement and use the correct layer?
- [ ] Are assertions meaningful and expected values independent of the implementation?
- [ ] Could a loading, empty or failed page create a false positive?
- [ ] Are selectors present, stable and accessible where possible?
- [ ] Is coverage duplicated without adding risk reduction?
- [ ] Are optional fields, revoked states and short identifiers covered?
- [ ] Did AI invent undocumented behavior or weaken a failing assertion?
- [ ] Does the diff preserve isolation, parallel execution and repository conventions?
- [ ] Do logs, traces and source contain only invented data and no secrets?
- [ ] Are failures diagnosed before adding retries or waits?
- [ ] Have build, tests, formatting and CI evidence actually been inspected?
- [ ] Would I approve this change without knowing AI generated it?

Unchecked items are deliberate: automated checks cannot claim a human performed this review.
