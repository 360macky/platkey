let deactivateShortcutsMessage = `PlatKey: Para desactivar los shortcuts se recargará esta página. ${
  window.location.pathname.startsWith("/clases/examen")
    ? "No te preocupes, no perderás el progreso del examen."
    : ""
}`;

let deactivateConfirmShortcuts = window.confirm(deactivateShortcutsMessage);

if (deactivateConfirmShortcuts) {
  chrome.storage.sync.set({ shortcuts: false });
  window.location.reload();
}
