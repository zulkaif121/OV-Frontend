import { expect, type Page, test } from "@playwright/test";

const email = process.env.E2E_USER_EMAIL;
const password = process.env.E2E_USER_PASSWORD;

export const ensureAuthEnv = () => {
  test.skip(!email || !password, "Set E2E_USER_EMAIL and E2E_USER_PASSWORD to run authenticated flows.");
};

export const loginToDashboard = async (page: Page) => {
  if (!email || !password) {
    return;
  }

  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL(/\/(dashboard|assistant|owner|cleaner|maintenance|today)(\/)?$/);
};
