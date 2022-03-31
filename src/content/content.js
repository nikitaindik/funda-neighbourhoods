import { wrapTableWithTitle, makeTableHtml } from "./table";
import { makeBadgesHtml, makeSettingsButtonHtml } from "./badges";

const zipCode = getZipCode();

if (zipCode) {
  console.log("Funda Neighbourhoods extension:", { zipCode });
  chrome.runtime.sendMessage({ zipCode }, ({ badgeProperties, tableProperties, error }) => {
    console.log({ badgeProperties, tableProperties });

    const badgesContainerElement = getBadgesContainerElement();

    if (!badgesContainerElement) {
      console.log("No badges container on this page");
      return;
    }

    if (error) {
      addGenericErrorMessage(badgesContainerElement);
      addSettingsButton(badgesContainerElement);
    } else {
      addBadges(badgesContainerElement, badgeProperties);
      addSettingsButton(badgesContainerElement);
      addNeighbourhoodTable(tableProperties);
    }

    subscribeToBadgeClicks();
  });
}

function getZipCode() {
  const zipCodeElement = document.querySelector(".object-header__subtitle");

  if (zipCodeElement === null) {
    return null;
  }

  const elementText = zipCodeElement.innerText;
  const zipCodeRe = /\d\d\d\d\s*[A-Z][A-Z]/;
  const match = elementText.match(zipCodeRe);

  return match[0].replace(" ", "");
}

function getBadgesContainerElement() {
  let badgesContainerElement = document.querySelector(".object-header__details .object-header__labels ul");

  if (!badgesContainerElement) {
    badgesContainerElement = document.createElement("ul");
    badgesContainerElement.classList.add(
      "fd-color-white",
      "fd-flex",
      "fd-list--none",
      "fd-m-bottom-xs",
      "fd-p-none",
      "fd-text--emphasis",
      "fd-text-size-s"
    );

    const headerLabelsElement = document.createElement("div");
    headerLabelsElement.classList.add("object-header__labels");
    headerLabelsElement.appendChild(badgesContainerElement);

    const headerDetailsElement = document.querySelector(".object-header__details");
    headerDetailsElement.insertAdjacentElement("afterbegin", headerLabelsElement);
  }

  return badgesContainerElement;
}

function addNeighbourhoodTable(tableProperties) {
  const tableHtml = makeTableHtml(tableProperties);

  const neighbourhoodNameElement = document.querySelector(".object-buurt__title ~ [data-local-insights-entry-point]");

  if (neighbourhoodNameElement) {
    neighbourhoodNameElement.insertAdjacentHTML("afterend", tableHtml);
  }

  const agentElement = document.querySelector(".object-detail-verkocht__makelaars-header");

  if (agentElement) {
    const tableWithTitle = wrapTableWithTitle(tableProperties, tableHtml);
    agentElement.insertAdjacentHTML("beforebegin", tableWithTitle);
  }
}

function addBadges(badgesContainerElement, badgeProperties) {
  badgesContainerElement.classList.add("badges-container");

  const badgesHtml = makeBadgesHtml(badgeProperties);
  badgesContainerElement.insertAdjacentHTML("beforeend", badgesHtml);
}

function addSettingsButton(badgesContainerElement) {
  const settingsButtonHtml = makeSettingsButtonHtml();
  badgesContainerElement.insertAdjacentHTML("beforeend", settingsButtonHtml);
}

function addGenericErrorMessage(badgesContainerElement) {
  const message = `<span class="funda-neighbourhoods-generic-error-message">${chrome.i18n.getMessage(
    "genericErrorMessage"
  )}</span>`;
  badgesContainerElement.insertAdjacentHTML("beforeend", message);
}

function subscribeToBadgeClicks() {
  const badgesContainerElement = getBadgesContainerElement();

  badgesContainerElement.addEventListener("click", event => {
    const clickedElement = event.target;
    const isBadgeClick =
      clickedElement.classList.contains("funda-neighbourhoods-badge") ||
      clickedElement.classList.contains("funda-neighbourhoods-configure-badge-clickable-area");

    if (isBadgeClick) {
      chrome.runtime.sendMessage({ action: "openOptionsPage" });
    }
  });
}
