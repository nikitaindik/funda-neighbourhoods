export function makeBadgesHtml(badgeProperties) {
  const badges = Object.values(badgeProperties)
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

  return badges;
}

export function makeSettingsButtonHtml() {
  const svg = `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0z" fill="none"></path>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
    </svg>
  `;

  const configureBadgesBadge = `
    <li
      class="funda-neighbourhoods-badge funda-neighbourhoods-configure-badge fd-border-radius fd-m-right-2xs fd-p-horizontal-xs"
      style="border-color: #607d8b; color: #607d8b; border-width: 1px; font-size: 0; padding: 0;"
      title="${chrome.i18n.getMessage("configureBadges")}"
    >
      ${svg}
      <div class="funda-neighbourhoods-configure-badge-clickable-area"></div>
    </li>`;

  return configureBadgesBadge;
}
