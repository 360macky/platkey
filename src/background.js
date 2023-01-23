/**
 * @file Service worker script for the extension that runs when the extension is installed.
 * {@link https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#service-workers}
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    shortcuts: false,
    greenboard: false,
    theme: "normal",
    spotlight: false,
    classlist: [],
    savedContributions: [],
  });
});
