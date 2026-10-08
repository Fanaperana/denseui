import { defineConfig, devices } from '@playwright/test'

const port = 5199

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      // Locally reuse the installed Edge so no browser download is needed.
      use: { ...devices['Desktop Chrome'], ...(process.env.CI ? {} : { channel: 'msedge' }) },
    },
  ],
  webServer: {
    // Production build: deterministic, no on-demand dependency optimization reloads.
    command: `pnpm --filter @denseui/playground build && pnpm --filter @denseui/playground exec vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
