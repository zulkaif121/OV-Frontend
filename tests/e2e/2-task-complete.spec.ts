import { expect, test } from "@playwright/test";

import { ensureAuthEnv, loginToDashboard } from "./helpers/auth";

test("Create Task -> Complete", async ({ page }) => {
  ensureAuthEnv();
  await loginToDashboard(page);

  await page.goto("/tasks");
  await page.getByRole("button", { name: "Create Task" }).first().click();
  await page.getByLabel("Task title").fill("Water heater inspection");
  await page.getByRole("button", { name: "Create Task" }).last().click();
  await page.getByRole("button", { name: "Mark Complete" }).click();

  await expect(page.getByText("Completed")).toBeVisible();
});
