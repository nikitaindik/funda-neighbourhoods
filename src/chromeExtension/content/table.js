function makeTableHtml(tableData) {
  const rowsHtml = makeTableRowsHtml(tableData);
  const tableHtml = wrapTableRowsHtml(rowsHtml);

  return tableHtml;
}

function makeTableRowsHtml(tableData) {
  return Object.values(tableData)
    .map(row => `<dt>${row.label}</dt><dd>${row.value}</dd>`)
    .join("");
}

function wrapTableRowsHtml(rowsHtml) {
  return `
      <div class="object-kenmerken-body" style="height: auto; margin-top: 16px;">
        <dl class="object-kenmerken-list">
        ${rowsHtml}
        </dl>
      </div>
    `;
}

module.exports = {
  makeTableHtml
};
