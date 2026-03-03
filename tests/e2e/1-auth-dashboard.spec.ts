import { expect, test } from "@playwright/test";

import { ensureAuthEnv, loginToDashboard } from "./helpers/auth";

test("Login -> Dashboard", async ({ page }) => {
  ensureAuthEnv();
  await loginToDashboard(page);
  await expect(page.getByRole("banner")).toBeVisible();
});
