export function makeBadgesHtml(badgeProperties) {
  return Object.values(badgeProperties)
    .map(({ name, label, year, shortLabel, value, color }) => {
      const badgeLabel = `${shortLabel}: ${value}`;
      const badgeTitle = year ? `${label} (${year})` : label;

      const style = `background: ${color};`;

      return `
        <li class="funda-neighbourhoods-badge fd-border-radius fd-m-right-2xs fd-p-horizontal-xs" style="${style}" title="${badgeTitle}" data-test="badge-${name}">
          ${badgeLabel}
        </li>`;
    })
    .join("");
}
