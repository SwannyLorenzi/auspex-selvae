import { test, expect } from '@playwright/test';

test('should display Hello World card', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('app-root')).toBeVisible();
  await expect(page.locator('app-root')).toContainText('Hello World');
});
