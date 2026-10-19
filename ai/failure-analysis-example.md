# Controlled masking regression

The main implementation remains correct. Use the example diff only in a disposable local branch, never in a shared deployment. The mutation changes the no-alias formatter from a mask to the raw ID. Keep all assertions unchanged.

```diff
- id.length > 4 ? `****${id.slice(-4)}` : '****'
+ id
```

After editing the expression in src/domain.ts:

```bash
npm run build
npx playwright test --project=chromium --grep "session-102 renders"
```

Expected failure (abridged; timings and line numbers vary):

```text
expect(locator).toHaveText(expected)
Expected string: "****8F21"
Received string: "ABC123458F21"
```

AI-assisted triage: the loaded session is correct, but its no-alias credential label is raw. Inspect credentialLabel and the detail renderer before investigating navigation. The likely cause is a missing masking branch. The impact is identifier exposure, including possible hidden DOM attributes. Restore the formatter, do not change the expectation to the leaked value. Verify the positive masked label and negative DOM assertion, then run the full suite.

Open the failed HTML report with npm run report. Locate the trace attachment, or run npx playwright show-trace with the trace.zip path from test-results. Review the DOM snapshot and API response to distinguish transport data from rendered data.

Restore the original expression, rebuild and rerun. The source fix and test evidence must both be reviewed; an AI explanation alone proves neither cause nor correction.
