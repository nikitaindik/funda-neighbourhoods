export function makeBadgesHtml(badgeProperties) {
  return Object.values(badgeProperties)
    .map(({ name, label, year, shortLabel, value, color }) => {
      const badgeLabel = `${shortLabel}: ${value}`;
      const badgeTitle = year ? `${label} (${year})` : label;

      const style = `background: ${color};`;

      return `
        <li class="label-nieuw funda-neighbourhoods-badge" style="${style}" title="${badgeTitle}" data-test="badge-${name}">
          ${badgeLabel}
        </li>`;
    })
    .join("");
}
