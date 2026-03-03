import { expect, test } from "@playwright/test";

import { ensureAuthEnv, loginToDashboard } from "./helpers/auth";

test("Settings Update", async ({ page }) => {
  ensureAuthEnv();
  await loginToDashboard(page);

  await page.goto("/settings");
  await page.getByLabel("Organization Name").fill("OVI Operations Team");
  await page.getByLabel("Timezone").fill("America/New_York");
  await page.getByRole("button", { name: "Save Settings" }).click();

  await expect(page.getByText("Updated")).toBeVisible();
});
