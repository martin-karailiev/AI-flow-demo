import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['blob'], ['list']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'api', testMatch: 'api/**/*.spec.ts' },
    {
      name: 'chromium',
      testMatch: 'e2e/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      testMatch: 'e2e/**/*.spec.ts',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:4173/api/sessions',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
