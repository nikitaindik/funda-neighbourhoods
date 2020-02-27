import { groupProperties } from "../common/utils";

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
      <div class="object-kenmerken-body" style="height: auto; margin-top: 16px;">
        <dl class="object-kenmerken-list">
        ${sectionsHtml}
        </dl>
      </div>
    `;
}

function makeSectionHeaderHtml(groupName) {
  const headerText = chrome.i18n.getMessage(groupName);

  return `<h3 class="object-kenmerken-list-header">${headerText}</h3>`;
}

function makeRowsHtml(group) {
  const rows = Object.values(group)
    .map(row => `<dt>${row.label}</dt><dd>${row.value}</dd>`)
    .join("");

  return `<dl class="object-kenmerken-list">${rows}</dl>`;
}

function getVisibleGroupNames(groupedProperties) {
  return Object.keys(groupedProperties).filter(
    groupName => groupName !== "doNotShowInTable"
  );
}
