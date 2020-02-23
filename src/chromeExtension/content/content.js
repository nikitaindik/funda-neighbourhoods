const { makeTableHtml } = require("./table");
const { makeBadgesHtml } = require("./badges");

const zipCode = getZipCode();

if (zipCode) {
  chrome.runtime.sendMessage(
    { zipCode },
    ({ badgeProperties, tableProperties }) => {
      addBadges(badgeProperties);
      addNeighbourhoodTable(tableProperties);
    }
  );
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
  let badgesContainerElement = document.querySelector(
    ".object-header__details-info .labels"
  );

  if (!badgesContainerElement) {
    badgesContainerElement = document.createElement("ul");
    badgesContainerElement.classList.add("labels");

    document
      .querySelector(".object-header__details-info")
      .appendChild(badgesContainerElement);
  }

  return badgesContainerElement;
}

function getIncomeLabel(income) {
  const colors = {
    noInfo: "#c0c0c0",
    hobos: "#4575b5",
    veryPoor: "#849eba",
    poor: "#c1ccbe",
    okay: "#fdd835",
    normies: "#fab681",
    wellOff: "#ed7550",
    rich: "#d62f28"
  };

  if (!income) {
    return {
      color: colors.noInfo,
      labelText: "No Info"
    };
  }

  if (income >= 30000) {
    return {
      color: colors.rich,
      labelText: "Rich"
    };
  }

  if (income >= 25000) {
    return {
      color: colors.wellOff,
      labelText: "Well-off"
    };
  }

  if (income >= 21000) {
    return {
      color: colors.normies,
      labelText: "Normies"
    };
  }

  if (income >= 19000) {
    return {
      color: colors.okay,
      labelText: "Okay"
    };
  }

  if (income >= 17000) {
    return {
      color: colors.poor,
      labelText: "Poor"
    };
  }

  if (income >= 15000) {
    return {
      color: colors.veryPoor,
      labelText: "Very Poor"
    };
  }

  return {
    color: colors.hobos,
    labelText: "Hobos"
  };
}

function addNeighbourhoodTable(tableProperties) {
  const neighbourhoodNameElement = document.querySelector(
    ".object-buurt__name"
  );

  const tableHtml = makeTableHtml(tableProperties);

  neighbourhoodNameElement.insertAdjacentHTML("afterend", tableHtml);
}

function addBadges(badgeProperties) {
  const badgesHtml = makeBadgesHtml(badgeProperties);

  const badgesContainerElement = getBadgesContainerElement();
  badgesContainerElement.insertAdjacentHTML("afterbegin", badgesHtml);
}
