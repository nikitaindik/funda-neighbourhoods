describe("Options page", () => {
  it("User should be able to go to options page by clicking on a badge", async () => {
    await page.goto(
      "file:///Users/n.indik/Play/funda-neighbourhoods/tests/dummy.html"
    );

    await page.waitForSelector("[data-test^=badge]");

    const browserContext = page.browserContext();

    const targetCreatedPromise = new Promise(resolve => {
      browserContext.on("targetcreated", resolve);
    });

    await page.click("[data-test=badge-neighbourhoodName]");

    const target = await targetCreatedPromise;

    expect(target.url()).toMatch(/chrome-extension:\/\/.*\/options\.html/);
  });
});
