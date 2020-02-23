function makeBadgesHtml(badgeProperties) {
  return Object.values(badgeProperties)
    .map(({ label, shortLabel, value }) => {
      const badgeLabel = `${shortLabel}: ${value}`;

      const color = "palevioletred";
      const style = `margin-left: 16px; background: ${color};`;

      return `<li class="label-nieuw" style="${style}" title="${label}">${badgeLabel}</li>`;
    })
    .join("");
}

module.exports = {
  makeBadgesHtml
};
