import { groupProperties } from "../common/utils";

export function wrapTableWithTitle(properties, tableHtml) {
  const neighbourhoodTitle = chrome.i18n.getMessage("neighbourhood");

  const neighbourhoodName = properties.find(({ name }) => name === "neighbourhoodName").value;
  const municipalityName = properties.find(({ name }) => name === "municipalityName").value;

  return `
    <div class="object-buurt">
      <h2 class="object-buurt__title">${neighbourhoodTitle}</h2>
      <p class="object-buurt__name">${neighbourhoodName}, ${municipalityName}</p>
      ${tableHtml}
    </div>
  `;
}

export function makeTableHtml(properties) {
  const sectionsHtml = makeTableSectionsHtml(properties);
  const tableHtml = wrapTableRowsHtml(sectionsHtml);

  return tableHtml;
}

function makeTableSectionsHtml(properties) {
  const groupedProperties = groupProperties(properties);
  const visibleGroupNames = getVisibleGroupNames(groupedProperties);

  return visibleGroupNames
    .map(groupName => {
      const headerHtml = makeSectionHeaderHtml(groupName);

      const group = groupedProperties[groupName];
      const rowsHtml = makeRowsHtml(group);

      return headerHtml + rowsHtml;
    })
    .join("");
}

function wrapTableRowsHtml(sectionsHtml) {
  return `
      <div class="object-kenmerken-body funda-neighbourhoods-table-container" data-test="tableContainer">
        <dl class="object-kenmerken-list">
        ${sectionsHtml}
        </dl>
      </div>
    `;
}

function makeSectionHeaderHtml(groupName) {
  const headerText = chrome.i18n.getMessage(groupName);

  return `
    <h3 class="object-kenmerken-list-header" data-test="propertiesGroup-${groupName}">
      ${headerText}
    </h3>
  `;
}

function makeRowsHtml(group) {
  const rows = Object.values(group)
    .map(
      row => `
        <dt data-test="propertyRowLabel-${row.name}">${row.label}</dt>
        <dd data-test="propertyRowValue-${row.name}" title="${row.value} (${row.year})">${row.value}</dd>
      `
    )
    .join("");

  return `<dl class="object-kenmerken-list">${rows}</dl>`;
}

function getVisibleGroupNames(groupedProperties) {
  return Object.keys(groupedProperties).filter(groupName => groupName !== "doNotShowInTable");
}
