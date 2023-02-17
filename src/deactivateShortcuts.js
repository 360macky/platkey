let deactivateShortcutsMessage = `PlatziKey: Para desactivar los shortcuts se recargará esta página. ${
  window.location.pathname.startsWith("/clases/examen") ?
  "No te preocupes, no perderás el progreso del examen." : ""
}`;

let confirm = window.confirm(deactivateShortcutsMessage);

if (confirm) {
  chrome.storage.sync.set({ shortcuts: false });
  window.location.reload();
}
