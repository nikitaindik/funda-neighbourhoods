function makeBadgesHtml(badgeProperties) {
  return Object.values(badgeProperties)
    .map(({ label, shortLabel, value, color }) => {
      const badgeLabel = `${shortLabel}: ${value}`;

      const style = `background: ${color};`;

      return `<li class="label-nieuw badge" style="${style}" title="${label}">${badgeLabel}</li>`;
    })
    .join("");
}

module.exports = {
  makeBadgesHtml
};
