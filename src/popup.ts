import esMessages from "./locales/es.json";
import enMessages from "./locales/en.json";

type IMessages = {
  [key: string]: string;
};

let messages: IMessages = {};

/**
 * @file Manages the events for the PlatziKey extension popup.
 * This file will add event listeners to the buttons and the radio options of popup UI
 */

const shortcutsButton = document.getElementById(
  "activateShortcuts"
) as HTMLButtonElement;
const greenboardButton = document.getElementById(
  "activateGreenboard"
) as HTMLButtonElement;
const spotlightButton = document.getElementById(
  "activateSpotlight"
) as HTMLButtonElement;
const shortcutsTitle = document.getElementById(
  "shortcutsTitle"
) as HTMLHeadingElement;
const spotlightTitle = document.getElementById(
  "spotlightTitle"
) as HTMLHeadingElement;
const greenboardTitle = document.getElementById(
  "greenboardTitle"
) as HTMLHeadingElement;
const themeOptions = document.getElementsByName("pkey__radio") as any;

type queryInfo = chrome.tabs.QueryInfo;
const queryDefaultOptions: queryInfo = { active: true, currentWindow: true };

/**
 * Update Shortcuts button UI.
 * @param {boolean} isActivated - Set the Button mode of Shortcuts button.
 */
function updateShortcutsButton(isActivated: boolean) {
  shortcutsButton.textContent = isActivated
    ? messages["deactivate"]
    : messages["activate"];
  shortcutsButton.ariaLabel = isActivated
    ? messages["deactivate"]
    : messages["activate"];
  shortcutsButton.classList.remove(
    isActivated ? "pkey__button-on" : "pkey__button-off"
  );
  shortcutsButton.classList.add(
    isActivated ? "pkey__button-off" : "pkey__button-on"
  );
  if (isActivated) {
    shortcutsTitle.classList.add("green-text");
  } else {
    shortcutsTitle.classList.remove("green-text");
  }
}

/**
 * Update Greenboard button UI.
 * @param {boolean} isActivated - Set the Button mode of Greenboard button.
 */
function updateGreenboardButton(isActivated: boolean) {
  greenboardButton.textContent = isActivated
    ? messages["deactivate"]
    : messages["activate"];
  greenboardButton.ariaLabel = isActivated
    ? messages["deactivate"]
    : messages["activate"];
  greenboardButton.classList.remove(
    isActivated ? "pkey__button-on" : "pkey__button-off"
  );
  greenboardButton.classList.add(
    isActivated ? "pkey__button-off" : "pkey__button-on"
  );
  if (isActivated) {
    greenboardTitle.classList.add("green-text");
  } else {
    greenboardTitle.classList.remove("green-text");
  }
}

/**
 * Update Spotlight UI.
 * @param {boolean} isActivated - Set the Button mode of Spotlight button.
 */
function updateSpotlightButton(isActivated: boolean) {
  spotlightButton.textContent = isActivated
    ? messages["deactivate"]
    : messages["activate"];
  spotlightButton.ariaLabel = isActivated
    ? messages["deactivate"]
    : messages["activate"];
  spotlightButton.classList.remove(
    isActivated ? "pkey__button-on" : "pkey__button-off"
  );
  spotlightButton.classList.add(
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
function changeTheme(theme: string) {
  let themeOption = document.getElementById(
    `radio-${theme}`
  ) as HTMLInputElement;
  themeOption.checked = true;
  chrome.storage.sync.set({ theme });
  chrome.tabs.query(queryDefaultOptions, (tabs) => {
    tabs.forEach((tab) => {
      let tabId = tab.id as number;
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["dist/js/content.js"],
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

shortcutsButton.addEventListener("click", () => {
  chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    if (shortcuts) {
      window.close();
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          let tabId = tab.id as number;
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["dist/js/deactivateShortcuts.js"],
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
      let tabId = tab.id as number;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["dist/js/content.js"],
      });
    });
  });
});

spotlightButton.addEventListener("click", () => {
  chrome.storage.sync.get("spotlight", ({ spotlight }) => {
    if (spotlight) {
      window.close();
      chrome.storage.sync.set({ spotlight: !spotlight });
      updateSpotlightButton(!spotlight);
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          let tabId = tab.id as number;
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["dist/js/deactivateSpotlight.js"],
          });
        });
      });
    } else {
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        chrome.storage.sync.set({ spotlight: !spotlight });
        updateSpotlightButton(!spotlight);
        tabs.forEach((tab) => {
          let tabId = tab.id as number;
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["dist/js/spotlight.js"],
          });
        });
      });
    }
  });
});

greenboardButton.addEventListener("click", () => {
  chrome.storage.sync.get("greenboard", ({ greenboard }) => {
    chrome.tabs.query(queryDefaultOptions, (tabs) => {
      tabs.forEach((tab) => {
        let tabUrl = tab.url as string;
        if (!tabUrl.includes("/clases/examen")) {
          const activateGreenboardWarning = `PlatKey: La herramienta Greenboard está pensada para su uso dentro de exámenes.`;
          window.alert(activateGreenboardWarning);
          return;
        } else {
          updateGreenboardButton(!greenboard);
          chrome.storage.sync.set({ greenboard: !greenboard });
        }

        if (greenboard) {
          let tabId = tab.id as number;
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["dist/js/deactivateGreenboard.js"],
          });
        } else {
          let tabId = tab.id as number;
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["dist/js/greenboard.js"],
          });
        }
      });
    });
  });
});

for (let index = 0; index < themeOptions.length; index++) {
  let themeOption = themeOptions[index];
  let elementRadio = themeOption.getAttribute("data-radio");
  themeOption.addEventListener("click", () => {
    changeTheme(elementRadio);
  });
}

function translateContent() {
  const language = window.navigator.language.slice(0, 2);
  const elements = document.querySelectorAll("[data-i18n]");
  messages = language === "es" ? esMessages : enMessages;

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n") as string;
    const message = messages[key] as string;
    if (message) {
      element.textContent = message;
    }
  });
}

window.addEventListener("load", translateContent);
