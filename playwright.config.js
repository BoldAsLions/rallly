// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory where your tests are located
  timeout: 30 * 1000, // Timeout for each test in milliseconds
  expect: {
    timeout: 5000, // Timeout for Playwright assertions
  },
  use: {
    headless: true, // Run tests in headless mode
    baseURL: 'http://localhost:3000', // Base URL for your application
    viewport: { width: 1280, height: 720 }, // Browser viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    screenshot: 'only-on-failure', // Take screenshots only on failures
    video: 'retain-on-failure', // Record video for failed tests
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }, // Use Chromium browser
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }, // Use Firefox browser
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }, // Use WebKit browser
    },
  ],
  reporter: [['html', { open: 'never' }]], // Generate an HTML report
});
