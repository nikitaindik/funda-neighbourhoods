export function makeBadgesHtml(badgeProperties) {
  return Object.values(badgeProperties)
    .map(({ label, shortLabel, value, color }) => {
      const badgeLabel = `${shortLabel}: ${value}`;

      const style = `background: ${color};`;

      return `<li class="label-nieuw badge" style="${style}" title="${label} (2015)">${badgeLabel}</li>`;
    })
    .join("");
}
