let deactivateSpotlightMessage =
  "PlatziKey: Para desactivar spotlight se recargará la página.";

let confirm = window.confirm(deactivateSpotlightMessage);

if (confirm) {
  chrome.storage.sync.set({ spotlight: false });
  window.location.reload();
}
