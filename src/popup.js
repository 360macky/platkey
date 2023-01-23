/**
 * @file Manages the events for the PlatziKey extension popup.
 * This file wih add event listeners to the buttons and the radio options of popup UI
 */

let activateShortcutsButton = document.getElementById("activateShortcuts");
let activateGreenboardButton = document.getElementById("activateGreenboard");
let activateSpotlightButton = document.getElementById("activateSpotlight");
let shortcutsTitle = document.getElementById("shortcutsTitle");
let spotlightTitle = document.getElementById("spotlightTitle");
let themeOptions = document.getElementsByName("pkey__radio");

const queryDefaultOptions = { active: true, currentWindow: true };

/**
 * Update Shortcuts button style.
 * @param {boolean} isActivated - Set the Button mode of Shortcuts button.
 */
function updateShortcutsButton(isActivated) {
  activateShortcutsButton.textContent = isActivated ? "Desactivar" : "Activar";
  activateShortcutsButton.ariaLabel = isActivated
    ? "Desactivar shortcuts"
    : "Activar shortcuts";
  activateShortcutsButton.classList.remove(
    isActivated ? "pkey__button-on" : "pkey__button-off"
  );
  activateShortcutsButton.classList.add(
    isActivated ? "pkey__button-off" : "pkey__button-on"
  );
  if (isActivated) {
    shortcutsTitle.classList.add("green-text");
  } else {
    shortcutsTitle.classList.remove("green-text");
  }
}

/**
 * Update Greenboard button style.
 * @param {boolean} isActivated - Set the Button mode of Greenboard button.
 */
function updateGreenboardButton(isActivated) {
  activateGreenboardButton.textContent = isActivated ? "Desactivar" : "Activar";
  activateGreenboardButton.ariaLabel = isActivated
    ? "Desactivar greenboard"
    : "Activar greenboard";
  activateGreenboardButton.classList.remove(
    isActivated ? "pkey__button-on" : "pkey__button-off"
  );
  activateGreenboardButton.classList.add(
    isActivated ? "pkey__button-off" : "pkey__button-on"
  );
  if (isActivated) {
    greenboardTitle.classList.add("green-text");
  } else {
    greenboardTitle.classList.remove("green-text");
  }
}

/**
 * Update Spotlight style.
 * @param {boolean} isActivated - Set the Button mode of Spotlight button.
 */
function updateSpotlightButton(isActivated) {
  activateSpotlightButton.textContent = isActivated ? "Desactivar" : "Activar";
  activateSpotlightButton.ariaLabel = isActivated
    ? "Desactivar spotlight"
    : "Activar spotlight";
  activateSpotlightButton.classList.remove(
    isActivated ? "pkey__button-on" : "pkey__button-off"
  );
  activateSpotlightButton.classList.add(
    isActivated ? "pkey__button-off" : "pkey__button-on"
  );
  if (isActivated) {
    spotlightTitle.classList.add("green-text");
  } else {
    spotlightTitle.classList.remove("green-text");
  }
}

/**
 * Change theme onClick event handler.
 * @param {String} theme - Theme name.
 */
function changeTheme(theme) {
  let themeOption = document.getElementById(`radio-${theme}`);
  themeOption.checked = true;
  chrome.storage.sync.set({ theme: theme });
  chrome.tabs.query(queryDefaultOptions, (tabs) => {
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/src/scripts/content.js"],
      });
    });
  });
}

chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
  updateShortcutsButton(shortcuts);
});
chrome.storage.sync.get("greenboard", ({ greenboard }) => {
  updateGreenboardButton(greenboard);
});
chrome.storage.sync.get("spotlight", ({ spotlight }) => {
  updateSpotlightButton(spotlight);
});

chrome.storage.sync.get("theme", ({ theme }) => {
  for (let index = 0; index < themeOptions.length; index++) {
    let themeOption = themeOptions[index];
    themeOption.checked = themeOption.id == `radio-${theme}`;
  }
});

activateShortcutsButton.addEventListener("click", (event) => {
  chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    if (shortcuts) {
      window.close();
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["deactivateShortcuts.js"],
          });
        });
      });
    } else {
      chrome.storage.sync.set({ shortcuts: true });
      updateShortcutsButton(true);
    }
  });

  chrome.tabs.query(queryDefaultOptions, (tabs) => {
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/src/scripts/content.js"],
      });
    });
  });
});

activateSpotlight.addEventListener("click", (event) => {
  chrome.storage.sync.get("spotlight", ({ spotlight }) => {
    if (spotlight) {
      window.close();
      chrome.storage.sync.set({ spotlight: !spotlight });
      updateSpotlightButton(!spotlight);
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["deactivateSpotlight.js"],
          });
        });
      });
    } else {
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        chrome.storage.sync.set({ spotlight: !spotlight });
        updateSpotlightButton(!spotlight);
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["/src/scripts/spotlight.js"],
          });
        });
      });
    }
  });
});

activateGreenboardButton.addEventListener("click", (event) => {  
  chrome.storage.sync.get("greenboard", ({ greenboard }) => {
    chrome.tabs.query(queryDefaultOptions, (tabs) => {
      tabs.forEach((tab) => {
        if (!tab.url.includes("/clases/examen")) {
          const activateGreenboardWarning = `PlatKey: La herramienta Greenboard está pensado para su uso dentro de exámenes.`;
          window.alert(activateGreenboardWarning);
          return;
        } else {
          updateGreenboardButton(!greenboard);
          chrome.storage.sync.set({ greenboard: !greenboard });
        }

        if (greenboard) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["deactivateGreenboard.js"],
          });
        } else {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["greenboard.js"],
          });          
        }
      });
    });
  });
});

for (let index = 0; index < themeOptions.length; index++) {
  let themeOption = themeOptions[index];
  let elementRadio = themeOption.getAttribute("data-radio");
  themeOption.addEventListener("click", (event) => {
    changeTheme(elementRadio);
  });
}
