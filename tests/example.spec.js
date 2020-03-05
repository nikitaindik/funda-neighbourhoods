describe("Property page", () => {
  beforeAll(async () => {
    await page.goto(
      "file:///Users/n.indik/Play/funda-neighbourhoods/tests/dummy.html"
    );
  });

  it("User should see default badges", async () => {
    await page.waitForSelector("[data-test^=badge]");

    const badges = await page.$$eval("[data-test^=badge]", badges => {
      const badgesCount = badges.length;

      return {
        count: badgesCount,
        textContent: badges.map(badge => badge.innerText)
      };
    });

    // Check that there are only 2 default badges
    expect(badges.count).toBe(2);

    // First badge is "neigbourhood name"
    expect(badges.textContent[0]).toContain("Neighbourhood:");

    // Secound badge is "residents income"
    expect(badges.textContent[1]).toContain("Res. income:");
  });
});
