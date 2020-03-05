export function makeBadgesHtml(badgeProperties) {
  return Object.values(badgeProperties)
    .map(({ name, label, shortLabel, value, color }) => {
      const badgeLabel = `${shortLabel}: ${value}`;
      const badgeTitle = `${label} (2015)`;

      const style = `background: ${color};`;

      return `
        <li class="label-nieuw funda-neighbourhoods-badge" style="${style}" title="${badgeTitle}" data-test="badge-${name}">
          ${badgeLabel}
        </li>`;
    })
    .join("");
}
