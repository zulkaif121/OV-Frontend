import { expect, test } from "@playwright/test";

import { ensureAuthEnv, loginToDashboard } from "./helpers/auth";

test("Inbox Message Send", async ({ page }) => {
  ensureAuthEnv();
  await loginToDashboard(page);

  await page.goto("/inbox");
  await page.getByLabel("Message input").fill("Vendor has arrived on-site.");
  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByText("Vendor has arrived on-site.")).toBeVisible();
});
