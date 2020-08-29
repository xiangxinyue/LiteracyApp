const Page = require("./helper/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("Launch the main page", async () => {
  const text = await page.getContentsOf("header h5.MuiTypography-root");
  expect(text).toEqual("Literacy Training");
});

test("Google OAuth signin", async () => {
  await page.click('a[href="/auth/student"]');
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("After signin, show Log Out Button", async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual("Log Out");
});
