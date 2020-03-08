const { dummyHousePageUrl, getExtensionBackgroundPage } = require("./utils");
const { allPropertyNames, allGroupNames } = require("./groupAndPropertyNames");

describe("Going to options page", () => {
  it("User should be able to go to options page by clicking on a badge", async () => {
    await page.goto(dummyHousePageUrl);

    await page.waitForSelector("[data-test^=badge]");

    const browserContext = page.browserContext();

    const targetCreatedPromise = new Promise(resolve => {
      browserContext.on("targetcreated", resolve);
    });

    await page.click("[data-test=badge-neighbourhoodName]");

    const target = await targetCreatedPromise;
    const targetUrl = target.url();

    const extensionBackgroundPage = await getExtensionBackgroundPage(browser);

    const optionsPageUrl = await extensionBackgroundPage.evaluate(() =>
      chrome.runtime.getURL("options.html")
    );

    expect(targetUrl).toMatch(optionsPageUrl);
  });
});

describe("Options page", () => {
  beforeAll(async () => {
    const extensionBackgroundPage = await getExtensionBackgroundPage(browser);

    const optionsPageUrl = await extensionBackgroundPage.evaluate(() =>
      chrome.runtime.getURL("options.html")
    );

    await page.goto(optionsPageUrl);
  });

  it("User should see all the properties on the options page", async () => {
    const { renderedGroupNames, renderedPropertyNames } = await page.$eval(
      "#options-table",
      tableContainerElement => {
        const renderedGroups = Array.from(
          tableContainerElement.querySelectorAll(
            "[data-test^=optionsPageGroupHeader]"
          )
        );

        const renderedGroupNames = renderedGroups
          .map(groupHeaderElement => groupHeaderElement.dataset.test)
          .map(testHook => testHook.match(/optionsPageGroupHeader-(.*)/)[1]);

        const renderedProperties = Array.from(
          tableContainerElement.querySelectorAll(
            "[data-test^=optionsPagePropertyLabel]"
          )
        );

        const renderedPropertyNames = renderedProperties
          .map(propertyElement => propertyElement.dataset.test)
          .map(testHook => testHook.match(/optionsPagePropertyLabel-(.*)/)[1]);

        return {
          renderedGroupNames,
          renderedPropertyNames
        };
      }
    );

    // Check that all groups are rendered
    expect(allGroupNames).toEqual(renderedGroupNames);

    // Check that all property rows are rendered
    expect(allPropertyNames).toEqual(renderedPropertyNames);
  });

  it("Default options should be selected", async () => {
    const selectedOptions = await page.$$eval(
      "[data-test^=optionsPagePropertyCheckbox]",
      checkboxElements => {
        const selectedCheckboxElements = checkboxElements.filter(
          ({ checked }) => checked
        );

        const selectedCheckboxNames = selectedCheckboxElements
          .map(({ dataset }) => dataset.test)
          .map(
            testHook => testHook.match(/optionsPagePropertyCheckbox-(.*)/)[1]
          );

        return selectedCheckboxNames;
      }
    );

    expect(selectedOptions).toEqual([
      "neighbourhoodName",
      "meanIncomePerResident"
    ]);
  });
});
