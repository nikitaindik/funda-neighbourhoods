import { OPTIONS } from "./constants";

export async function readUserSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(OPTIONS, resolve);
  });
}
