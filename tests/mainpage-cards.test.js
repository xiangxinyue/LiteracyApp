const Page = require("./helper/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("When logged in", () => {
  beforeEach(async () => {
    await page.login();
  });

  describe("When enter Sound Training Session", () => {
    beforeEach(async () => {
      await page.click('a[href="/student/phoneme"]');
      await page.waitFor("div.jumbotron p h2");
    });

    test("Can see the title", async () => {
      const text = await page.getContentsOf("div.jumbotron p h2");
      expect(text).toEqual("Welcome to Sound Training Main Page");
    });
  });

  describe("When enter Speed Training Session", () => {
    beforeEach(async () => {
      await page.click('a[href="/student/fluency"]');
      await page.waitFor("div.jumbotron p h2");
    });

    test("Can see the title", async () => {
      const text = await page.getContentsOf("div.jumbotron p h2");
      expect(text).toEqual("Welcome to Speed Training Main Page");
    });
  });

  describe("When enter Meaning Training Session", () => {
    beforeEach(async () => {
      await page.click('a[href="/student/meaning"]');
      await page.waitFor("div.jumbotron div h2");
    });

    test("Can see the title", async () => {
      const text = await page.getContentsOf("div.jumbotron div h2");
      expect(text).toEqual("Welcome to Meaning Training Main Page");
    });
  });

  describe("When enter Print Training Session", () => {
    beforeEach(async () => {
      await page.click("a[href='/student/print']");
      await page.waitFor("div.jumbotron div h2");
    });

    test("Can see the title", async () => {
      const text = await page.getContentsOf("div.jumbotron div h2");
      expect(text).toEqual("Welcome to Print Training Main Page");
    });
  });
});
