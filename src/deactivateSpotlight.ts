let deactivateSpotlightMessage =
  "PlatKey: Para desactivar spotlight se recargará la página.";

let deactivateConfirmSpotlight = window.confirm(
  deactivateSpotlightMessage
) as boolean;

if (deactivateConfirmSpotlight) {
  chrome.storage.sync.set({ spotlight: false });
  window.location.reload();
}
