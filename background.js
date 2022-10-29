chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    shortcuts: false,
    greenboard: false,
    theme: "normal",
    spotlight: false,
    classlist: [],
    savedContributions: []
  });
});
