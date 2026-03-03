import { expect, test } from "@playwright/test";

import { ensureAuthEnv, loginToDashboard } from "./helpers/auth";

test("Vendor Dispatch", async ({ page }) => {
  ensureAuthEnv();
  await loginToDashboard(page);

  await page.goto("/vendor-triage");
  await page.getByLabel("Vendor Name").fill("RapidFix LLC");
  await page.getByLabel("Task Reference").fill("TASK-7821");
  await page.getByRole("button", { name: "Dispatch" }).click();

  await expect(page.getByText("Dispatched")).toBeVisible();
});
