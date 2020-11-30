import { wrapTableWithTitle, makeTableHtml } from "./table";
import { makeBadgesHtml } from "./badges";

const zipCode = getZipCode();

if (zipCode) {
  console.log({ zipCode });
  chrome.runtime.sendMessage({ zipCode }, ({ badgeProperties, tableProperties }) => {
    console.log({ badgeProperties, tableProperties });
    addBadges(badgeProperties);
    addNeighbourhoodTable(tableProperties);

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

  const neighbourhoodNameElement = document.querySelector(".object-buurt__name");

  if (neighbourhoodNameElement) {
    neighbourhoodNameElement.insertAdjacentHTML("afterend", tableHtml);
  }

  const agentElement = document.querySelector(".object-detail-verkocht__makelaars-header");

  if (agentElement) {
    const tableWithTitle = wrapTableWithTitle(tableProperties, tableHtml);
    agentElement.insertAdjacentHTML("beforebegin", tableWithTitle);
  }
}

function addBadges(badgeProperties) {
  const badgesContainerElement = getBadgesContainerElement();

  if (badgesContainerElement) {
    badgesContainerElement.classList.add("badges-container");

    const badgesHtml = makeBadgesHtml(badgeProperties);
    badgesContainerElement.insertAdjacentHTML("beforeend", badgesHtml);
  }
}

function subscribeToBadgeClicks() {
  const badgesContainerElement = getBadgesContainerElement();

  badgesContainerElement.addEventListener("click", event => {
    const clickedElement = event.target;
    const isBadgeClick = clickedElement.classList.contains("funda-neighbourhoods-badge");

    if (isBadgeClick) {
      chrome.runtime.sendMessage({ action: "openOptionsPage" });
    }
  });
}
