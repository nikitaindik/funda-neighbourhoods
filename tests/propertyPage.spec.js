const { dummyHousePageUrl } = require("./utils");
const { allPropertyNames, allGroupNames } = require("./groupAndPropertyNames");

describe("Property page", () => {
  beforeAll(async () => {
    await page.goto(dummyHousePageUrl);
    await page.waitForSelector("[data-test^=badge]");
  });

  it("User should see default badges", async () => {
    const badgeNames = await page.$$eval("[data-test^=badge]", badges => {
      const badgeNames = badges
        .map(badge => badge.dataset.test)
        .map(testHook => testHook.match(/badge-(.*)/)[1]);

      return badgeNames;
    });

    expect(badgeNames).toEqual(["neighbourhoodName", "meanIncomePerResident"]);
  });

  it("User should see a table with all available neighbourhood properties", async () => {
    const { renderedGroupNames, renderedPropertyNames } = await page.$eval(
      "[data-test=tableContainer]",
      tableContainerElement => {
        const renderedGroups = Array.from(
          tableContainerElement.querySelectorAll("[data-test^=propertiesGroup]")
        );

        const renderedGroupNames = renderedGroups
          .map(groupHeaderElement => groupHeaderElement.dataset.test)
          .map(testHook => testHook.match(/propertiesGroup-(.*)/)[1]);

        const renderedProperties = Array.from(
          tableContainerElement.querySelectorAll(
            "[data-test^=propertyRowLabel]"
          )
        );

        const renderedPropertyNames = renderedProperties
          .map(propertyElement => propertyElement.dataset.test)
          .map(testHook => testHook.match(/propertyRowLabel-(.*)/)[1]);

        return {
          renderedGroupNames,
          renderedPropertyNames
        };
      }
    );

    // Check that all groups are rendered
    const visibleGroupNames = allGroupNames.filter(
      groupName => groupName !== "doNotShowInTable"
    );
    expect(visibleGroupNames).toEqual(renderedGroupNames);

    // Check that all property rows are rendered
    const visiblePropertyNames = allPropertyNames.filter(
      propertyName => propertyName !== "neighbourhoodName"
    );
    expect(visiblePropertyNames).toEqual(renderedPropertyNames);
  });
});
