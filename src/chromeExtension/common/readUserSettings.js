import { VIEWABLE_PROPERTIES } from "./viewableProperties";

export async function readUserSettings() {
  const viewablePropertiesName = VIEWABLE_PROPERTIES.map(({ name }) => name);

  return new Promise(resolve => {
    chrome.storage.sync.get(viewablePropertiesName, resolve);
  });
}
