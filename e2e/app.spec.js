const { test, expect } = require("@playwright/test");

test("loads Arabic interface and starts a match", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("اللعب لك");
  await page.locator("#newMatchBtn").click();
  await page.locator("#playerNameFields input").nth(0).fill("أحمد");
  await page.locator("#playerNameFields input").nth(1).fill("محمد");
  await page.locator("#matchForm button[type=submit]").click();
  await expect(page.locator("#scoreboard")).toContainText("أحمد");
  await expect(page.locator("#scoreboard")).toContainText("محمد");
});

test("records a round and keeps totals after reload", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator("#newMatchBtn").click();
  await page.locator("#playerNameFields input").nth(0).fill("Player A");
  await page.locator("#playerNameFields input").nth(1).fill("Player B");
  await page.locator("#matchForm button[type=submit]").click();
  await page.locator("#scoreInputs input").nth(0).fill("12");
  await page.locator("#scoreInputs input").nth(1).fill("8");
  await page.locator("#saveRoundBtn").click();
  await expect(page.locator("#scoreboard")).toContainText("12");
  await page.reload();
  await expect(page.locator("#scoreboard")).toContainText("12");
});
