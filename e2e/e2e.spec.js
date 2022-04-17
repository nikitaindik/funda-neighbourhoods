const child_process = require("child_process");
const path = require("path");

const puppeteer = require("puppeteer-core");
const webExt = require("web-ext");
const getPort = require("get-port");

const ONE_SECOND_IN_MS = 1000;
const ONE_MINUTE_IN_MS = 60 * ONE_SECOND_IN_MS;

jest.setTimeout(10 * ONE_MINUTE_IN_MS);

describe("Property page", () => {
  let browser;

  beforeAll(async () => {
    const cdpPort = await getPort();
    console.log("Got free port", cdpPort);

    console.log("Starting FF with web-ext...", process.env.FIREFOX_BINARY_PATH || "/bin/firefox");
    const lsResult = child_process.execSync("ls");
    console.log(lsResult.toString());
    await webExt.cmd.run(
      {
        firefox: process.env.FIREFOX_BINARY_PATH || "/bin/firefox",
        sourceDir: path.resolve(__dirname, "../build"),
        args: ["--remote-debugging-port", cdpPort, "--start-maximized", "--verbose"],
        pref: { "intl.accept_languages": "nl-NL, nl, en-US, en", "intl.regional_prefs.use_os_locales": true }, // Doesn't work for some reason
      },
      { shouldExitProgram: false }
    );
    console.log("FF started");

    console.log("Waiting for the FF to get ready for receiving connections...");
    child_process.execSync("sleep 15");
    console.log("Wait end");

    console.log("Connecting to running FF...");

    browser = await puppeteer.connect({
      browserURL: `http://localhost:${cdpPort}`,
      product: "firefox",
      defaultViewport: null,
    });
    console.log("Connected");
  });

  it("Test", async () => {
    console.log("Opening a new page...");
    const pages = await browser.pages();
    const page = pages[0];
    console.log("Done");

    console.log("Going to a property page...");
    await page.goto("https://www.funda.nl/koop/stadskanaal/huis-42752531-baronielaan-25/", {
      timeout: 3 * ONE_MINUTE_IN_MS,
    });
    console.log("Done");

    console.log("Closing the cookie popup...");
    await page.waitForSelector("#onetrust-pc-btn-handler");
    await wait(page, 3000);
    await page.click("#onetrust-pc-btn-handler");
    await wait(page, 3000);
    await page.click(".save-preference-btn-handler");
    console.log("Done...");

    console.log("Waiting for the page contents to finish loading...");
    await wait(page, 10000);
    console.log("Done");

    console.log('Waiting for ".funda-neighbourhoods-badge"...');
    await page.waitForSelector(".funda-neighbourhoods-badge");
    console.log("Done");

    console.log('Hovering over ".funda-neighbourhoods-configure-badge-clickable-area"...');
    await page.hover(".funda-neighbourhoods-configure-badge-clickable-area");
    console.log("Done");

    console.log("Waiting a little bit more, just in case...");
    await wait(page, 5000);
    console.log("Done");

    console.log("Taking a screenshot of default badges...");
    await page.screenshot({ path: "1.jpg", type: "jpeg", quality: 30 });
    console.log("Done");

    console.log("Querying default badges...");
    const defaultBadges = await page.$$eval("[data-test^=badge]", badgeElementList => {
      return badgeElementList.map(badgeElement => badgeElement.innerText);
    });
    console.log("Done", defaultBadges);

    expect(defaultBadges).toEqual(["Neighbourhood: Maarswold", "Res. income: €16,000 (Very low)"]);

    console.log("Hovering over the neighbourhood table...");
    await page.hover('[data-test="tableContainer"]');
    console.log("Done");

    console.log("Waiting...");
    await wait(page, 5000);
    console.log("Done");

    console.log("Taking a screenshot of the table...");
    await page.screenshot({ path: "2.jpg", type: "jpeg", quality: 30 });
    console.log("Done");

    console.log("Querying table content...");
    const tableContent = await page.$$eval("[data-test^=propertyRow]", labelsAndValuesElementList =>
      labelsAndValuesElementList.reduce((tableContent, selectedElement, selectedElementIndex) => {
        const resultIndex = Math.floor(selectedElementIndex / 2);
        const isLabel = selectedElementIndex % 2 === 0;

        if (isLabel) {
          tableContent[resultIndex] = [selectedElement.innerText];
        } else {
          tableContent[resultIndex][1] = selectedElement.innerText;
        }

        return tableContent;
      }, [])
    );
    console.log("Done");

    expect(tableContent).toEqual([
      ["Buildings built before 2000", "88%"],
      ["Buildings built after 2000", "12%"],
      ["Mean income per resident", "€16,000 (Very low)"],
      ["Mean income per income recipient", "€19,700"],
      ["Very high income households", "3.2%"],
      ["Low income households", "13.4%"],
      ["Very low income households", "70.6%"],
      ["Households with income below social minimum", "12.5%"],
      ["Residents age: 0 - 14 years", "16%"],
      ["Residents age: 15 - 24 years", "9%"],
      ["Residents age: 25 - 44 years", "19%"],
      ["Residents age: 45 - 64 years", "22%"],
      ["Residents age: 65 and older", "35%"],
      ["Non-married", "41%"],
      ["Married", "31%"],
      ["Divorced", "12%"],
      ["Widowed", "16%"],
      ["Single-person households", "24%"],
      ["Households with children", "13%"],
      ["Households without children", "12%"],
      ["Rental properties", "78%"],
      ["Owned properties", "22%"],
      ["Single-family residential", "59%"],
      ["Multi-family residential", "41%"],
      ["Immigrants with western background", "7%"],
      ["Immigrants with non-western background", "9%"],
      ["From Morocco", "0%"],
      ["From Antilles or Aruba", "0%"],
      ["From Suriname", "1%"],
      ["From Turkey", "0%"],
      ["Imm. from non-western countries", "7%"],
      ["Non-immigrants", "85%"],
    ]);

    console.log('Hovering over ".funda-neighbourhoods-configure-badge-clickable-area"...');
    await page.hover(".funda-neighbourhoods-configure-badge-clickable-area");
    console.log("Done");

    console.log("Waiting a little bit more, just in case...");
    await wait(page, 5000);
    console.log("Done");

    console.log("Clicking to go to the options page...");
    await page.click(".funda-neighbourhoods-configure-badge-clickable-area");
    console.log("Done");

    console.log("Waiting a little bit more, just in case...");
    await wait(page, 5000);
    console.log("Done");

    const pageTargets = await browser.pages();
    const lastOpenPage = pageTargets[pageTargets.length - 1];
    const lastOpenPageUrl = await lastOpenPage.evaluate(() => location.href);

    expect(lastOpenPageUrl).toMatch("options.html");

    console.log("Waiting a little bit more, just in case...");
    await wait(lastOpenPage, 10000);
    console.log("Done");

    console.log("Taking a screenshot of the options page...");
    await lastOpenPage.screenshot({ path: "3.jpg", type: "jpeg", quality: 30 });
    console.log("Done");

    await lastOpenPage.click("[data-test=optionsPagePropertyLabel-neighbourhoodName]");
    await lastOpenPage.click("[data-test=optionsPagePropertyLabel-meanIncomePerResident]");

    const optionHandles = await lastOpenPage.$$("[data-test^=optionsPagePropertyLabel-]");

    await asyncForEach(optionHandles, async optionHandle => {
      await optionHandle.click();
    });

    console.log("Waiting a little bit more, just in case...");
    await wait(lastOpenPage, 5000);
    console.log("Done");

    await lastOpenPage.close();

    console.log("Waiting a little bit more, just in case...");
    await wait(page, 15000);
    console.log("Done");

    await page.reload({ timeout: ONE_MINUTE_IN_MS });

    console.log("Waiting a little bit more, just in case...");
    await wait(page, 15000);
    console.log("Done");

    console.log('Hovering over ".funda-neighbourhoods-configure-badge-clickable-area"...');
    await page.hover(".funda-neighbourhoods-configure-badge-clickable-area");
    console.log("Done");

    console.log("Waiting a little bit more, just in case...");
    await wait(page, 5000);
    console.log("Done");

    console.log("Taking a screenshot of all badges...");
    await page.screenshot({ path: "4.jpg", type: "jpeg", quality: 30 });
    console.log("Done");

    console.log("Querying default badges...");
    const visibleBadges = await page.$$eval("[data-test^=badge]", badgeElementList => {
      return badgeElementList.map(badgeElement => badgeElement.innerText);
    });
    console.log("Done", visibleBadges);

    expect(visibleBadges).toEqual([
      "Neighbourhood: Maarswold",
      "Municipality: Stadskanaal",
      "Before 2000: 88%",
      "After 2000: 12%",
      "Res. income: €16,000 (Very low)",
      "Recip. income: €19,700",
      "Very high inc. HH: 3.2%",
      "Low inc. HH: 13.4%",
      "Very low inc. HH: 70.6%",
      "Below social min. HH: 12.5%",
      "0 - 14 y.o.: 16%",
      "15 - 24 y.o.: 9%",
      "25 - 44 y.o.: 19%",
      "45 - 64 y.o.: 22%",
      "65+ y.o.: 35%",
      "Non-married: 41%",
      "Married: 31%",
      "Divorced: 12%",
      "Widowed: 16%",
      "Single: 24%",
      "With children: 13%",
      "No children: 12%",
      "Rental: 78%",
      "Owned: 22%",
      "Single-family: 59%",
      "Multi-family: 41%",
      "Western imm.: 7%",
      "Non-western imm.: 9%",
      "Morocco: 0%",
      "Antilles or Aruba: 0%",
      "Suriname: 1%",
      "Turkey: 0%",
      "Other non-western: 7%",
      "Non-immigrants: 85%",
    ]);

    await browser.close();
  });
});

async function asyncForEach(list, fn) {
  for (let index = 0; index < list.length; index++) {
    await fn(list[index], index);
  }
}

async function wait(page, milliseconds) {
  await page.waitForTimeout(milliseconds + 2000 * Math.random());
}
