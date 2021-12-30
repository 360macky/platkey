/**
 * @file Manages the events for the PlatziKey extension popup.
 */

let activateShortcutsButton = document.getElementById("activateShortcuts");
let activateGreenboardButton = document.getElementById("activateGreenboard");
let shortcutsTitle = document.getElementById("shortcutsTitle");
let themeOptions = document.getElementsByName("pkey__radio");

const queryDefaultOptions = { active: true, currentWindow: true };

/**
 * Update Shortcuts button style.
 * @param {boolean} isActivated - Set the Button mode of Shortcuts button.
 */
function updateShortcutsButton(isActivated) {
  if (isActivated) {
    activateShortcutsButton.innerHTML = "Desactivar";
    activateShortcutsButton.classList.remove("pkey__button-on");
    activateShortcutsButton.classList.add("pkey__button-off");
    shortcutsTitle.classList.add("green-text");
  } else {
    activateShortcutsButton.innerText = "Activar";
    activateShortcutsButton.classList.remove("pkey__button-off");
    activateShortcutsButton.classList.add("pkey__button-on");
    shortcutsTitle.classList.remove("green-text");
  }
}

/**
 * Update Greenboard button style.
 * @param {boolean} isActivated - Set the Button mode of Greenboard button.
 */
function updateGreenboardButton(isActivated) {
  if (isActivated) {
    activateGreenboardButton.innerHTML = "Desactivar";
    activateGreenboardButton.classList.remove("pkey__button-on");
    activateGreenboardButton.classList.add("pkey__button-off");
    greenboardTitle.classList.add("green-text");
  } else {
    activateGreenboardButton.innerText = "Activar";
    activateGreenboardButton.classList.remove("pkey__button-off");
    activateGreenboardButton.classList.add("pkey__button-on");
    greenboardTitle.classList.remove("green-text");
  }
}

chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
  updateShortcutsButton(shortcuts);
});
chrome.storage.sync.get("greenboard", ({ greenboard }) => {
  updateGreenboardButton(greenboard);
});

activateShortcutsButton.addEventListener("click", (event) => {
  chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    if (shortcuts) {
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["deactivateShortcuts.js"],
          });
        });
      });
    } else {
      chrome.storage.sync.set({ shortcuts: !shortcuts });
      updateShortcutsButton(!shortcuts);
    }
  });

  chrome.tabs.query(queryDefaultOptions, (tabs) => {
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    });
  });
});

activateGreenboardButton.addEventListener("click", (event) => {
  chrome.storage.sync.get("greenboard", ({ greenboard }) => {
    if (greenboard) {
      chrome.storage.sync.set({ greenboard: !greenboard });
      updateGreenboardButton(!greenboard);
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["deactivateGreenboard.js"],
          });
        });
      });
    } else {
      chrome.storage.sync.set({ greenboard: !greenboard });
      updateGreenboardButton(!greenboard);
      chrome.tabs.query(queryDefaultOptions, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["greenboard.js"],
          });
        });
      });
    }
  });
});

for (let index = 0; index < themeOptions.length; index++) {
  let themeOption = themeOptions[index];
  let elementRadio = themeOption.getAttribute("data-radio");
  themeOption.addEventListener("click", (event) => {
    changeTheme(elementRadio);
  });
}

chrome.storage.sync.get("theme", ({ theme }) => {
  for (let index = 0; index < themeOptions.length; index++) {
    let themeOption = themeOptions[index];
    if (themeOption.id == `radio-${theme}`) {
      themeOption.checked = true;
    } else {
      themeOption.checked = false;
    }
  }
});

/**
 * Change theme onClick event handler.
 * @param {String} theme name
 */
function changeTheme(theme) {
  let themeOption = document.getElementById(`radio-${theme}`);
  themeOption.checked = true;
  chrome.storage.sync.set({ theme: theme });
  chrome.tabs.query(queryDefaultOptions, (tabs) => {
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    });
  });
}
