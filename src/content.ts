/**
 * @file Manages the features from popup.js.
 */
import { isMac, getScriptOrStylesheet, htmlToElement } from "./utils";
import { activateGreenboardOnPlatziTest } from "./greenboard";

/**
 * @name compareKey
 * Check if keyPressed is in values array.
 * @param {Array} values
 * @param {Element} keyPressed
 */
function compareKey(values: Array<string>, keyPressed: string) {
  return values.indexOf(keyPressed) > -1;
}

/**
 * Click in Platzi Test "Next" Button.
 */
function nextQuestion() {
  const nextStep = document.getElementsByClassName(
    "ControlBar-button ControlBar-button--right"
  )[0] as HTMLElement;
  setTimeout(() => {
    nextStep.click();
  }, 200);
  setTimeout(() => {
    nextStep.click();
  }, 1000);
}

/**
 * Click in Platzi Test "Skip" Button.
 */
function skipQuestion() {
  const skipQuestion = document.getElementsByClassName(
    "ControlBar-button ControlBar-button--left"
  )[0] as HTMLElement;
  setTimeout(() => {
    skipQuestion.click();
  }, 200);
  setTimeout(() => {
    skipQuestion.click();
  }, 1000);
}

/**
 * @name shortcutsOnPlatzi
 * @description Manages keyboard touches by firing a click() method and calling skipQuestion() and nextQuestion().
 */
function shortcutsOnPlatzi(event: KeyboardEvent) {
  if (window.location.pathname.startsWith("/clases/examen")) {
    const isOnlyKeyPressed =
      !event.ctrlKey && !event.metaKey && !event.shiftKey;
    const cmdOrCtrl = isMac() ? event.metaKey : event.ctrlKey;
    const cmdEnter = cmdOrCtrl && event.key === "Enter";
    if (cmdEnter) {
      const startExamButtons = document.getElementsByClassName(
        "StartExamOverview-btn"
      ) as HTMLCollectionOf<HTMLElement>;
      if (startExamButtons.length > 0) {
        startExamButtons[0].click();
        return;
      }
    }
    const options = document.getElementsByClassName(
      "QuestionSelector-options"
    )[0].children as HTMLCollectionOf<HTMLElement>;
    if (isOnlyKeyPressed) {
      if (compareKey(["A", "a", "1"], event.key)) {
        options[0].click();
      } else if (compareKey(["B", "b", "2"], event.key)) {
        options[1].click();
      } else if (compareKey(["C", "c", "3"], event.key)) {
        options[2].click();
      } else if (compareKey(["D", "d", "4"], event.key)) {
        options[3].click();
      } else if (compareKey(["E", "e", "5"], event.key)) {
        options[4].click();
      }
      if (compareKey(["X", "x", "0"], event.key)) {
        skipQuestion();
      } else {
        nextQuestion();
      }
    }
    return;
  }
  if (window.location.pathname.startsWith("/clases/")) {
    // Open Contribution editor.
    const cmdOrCtrl = isMac() ? event.metaKey : event.ctrlKey;
    const shiftA = event.shiftKey && compareKey(["a", "A"], event.key);
    const cmdB = cmdOrCtrl && compareKey(["b", "B"], event.key);
    const cmdI = cmdOrCtrl && compareKey(["i", "I"], event.key);
    const cmdU = cmdOrCtrl && compareKey(["u", "U"], event.key);
    const cmdQ = cmdOrCtrl && compareKey(["q", "Q"], event.key);
    const cmdShiftK =
      event.shiftKey && cmdOrCtrl && compareKey(["k", "K"], event.key);
    const cmdK = cmdOrCtrl && compareKey(["k", "K"], event.key);
    const cmdShiftI =
      event.shiftKey && cmdOrCtrl && compareKey(["i", "I"], event.key);

    // Preview
    const cmdEnter = cmdOrCtrl && event.key === "Enter";

    // Classes controls
    const shiftN = event.shiftKey && compareKey(["n", "N"], event.key);
    const shiftP = event.shiftKey && compareKey(["p", "P"], event.key);
    const shiftM = event.shiftKey && compareKey(["m", "M"], event.key);

    const nextClass = document.getElementsByClassName(
      "Header-course-actions-next"
    )[0] as HTMLElement;
    if (shiftN) {
      nextClass.click();
    }
    const prevClass = document.getElementsByClassName(
      "Header-course-actions-prev"
    )[0] as HTMLElement;
    if (shiftP) {
      prevClass.click();
    }
    if (shiftA) {
      const editorInput = document.getElementsByClassName(
        "EditorWrapper-input"
      )[0] as HTMLElement;
      editorInput.click();
      // Prevent inserting unwanted words like "A" after entering Shift+A.
      setTimeout(() => {
        const pulseEditor = document.getElementsByClassName(
          "PulseEditor-field"
        )[0] as HTMLTextAreaElement;
        pulseEditor.value = "";
      }, 10);
    }
    // Save class
    if (shiftM) {
      const saveClassButton = document.getElementById(
        "save-class-button"
      ) as HTMLElement;
      saveClassButton.click();
    }
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement.tagName === "TEXTAREA") {
      if (cmdB) {
        const boldButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--bold"
        )[0] as HTMLElement;
        boldButton.click();
      }
      // TODO: Merge with cmdI
      if (cmdShiftI) {
        const italicButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--italic"
        )[0] as HTMLElement;
        italicButton.click();
        return;
      }
      if (cmdI) {
        const italicButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--italic"
        )[0] as HTMLElement;
        italicButton.click();
      }
      if (cmdU) {
        const underlineButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--underline"
        )[0] as HTMLElement;
        underlineButton.click();
      }
      if (cmdQ) {
        const quoteButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--quote"
        )[0] as HTMLElement;
        quoteButton.click();
      }
      if (cmdShiftK) {
        const codeButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--code"
        )[0] as HTMLElement;
        codeButton.click();
        return;
      }
      if (cmdK) {
        const linkButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--link"
        )[0] as HTMLElement;
        linkButton.click();
      }
      if (cmdEnter) {
        const previewButton = document.getElementsByClassName(
          "PulseEditor-button PulseEditor-button--preview"
        )[0] as HTMLElement;
        if (
          document.getElementsByClassName("PulseEditor-button is-expand")
            .length > 0
        ) {
          previewButton.click();
        } else {
          const pulseEditor = document.getElementsByClassName(
            "PulseEditor-field"
          )[0] as HTMLTextAreaElement;
          pulseEditor.click();
        }
      }
    } else {
      if (cmdB) {
        const syllabusToggle = document.getElementsByClassName(
          "Syllabus-toggle"
        )[0] as HTMLElement;
        syllabusToggle.click();
      }
    }
  }
}

/**
 * @name activateShortcutsOnPlatzi
 * @keyboard Enable keyboard shortcuts on window load.
 */
function activateShortcutsOnPlatzi() {
  if (window.location.pathname.startsWith("/clases/examen")) {
    if (document.getElementsByClassName("StartExamOverview-list").length > 0) {
      const overviewList = document.getElementsByClassName(
        "StartExamOverview-list"
      )[0];
      const shortcutsInfo = document.createElement("li");
      shortcutsInfo.textContent =
        "Puedes usar shortcuts de tu extensión Platkey.";
      overviewList.append(shortcutsInfo);
    }
  }
  window.addEventListener("keydown", shortcutsOnPlatzi);
}

/**
 * @name deactivateGreenboardOnPlatziTest
 * @description Remove Greenboard from Platzi Test.
 */
function deactivateGreenboardOnPlatziTest() {
  const greenboardContainer = document.querySelector(
    ".grid-container"
  ) as HTMLElement;
  if (document.querySelector(".grid-container")) {
    document
      .getElementsByClassName("QuestionSelector")[0]
      .removeChild(greenboardContainer);
  }
}

/**
 * @name appendStylesheet
 * @description Append stylesheet link to the head of the document.
 * @param {String} theme Theme name.
 */
function appendStylesheet(theme: string) {
  let head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.id = theme;
  link.href = `https://360macky.github.io/platzikey-themes/${theme}.css`;
  head.appendChild(link);
}

/**
 * @name removeElementsIfExists
 * @description Remove HTML elements if exists in the document by id.
 * @param {String[]} ids Array of ids.
 */
function removeElementsIfExists(ids: string[]) {
  for (let index = 0; index < ids.length; index++) {
    const id = ids[index];
    const elementToRemove = document.getElementById(id);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  }
}

/**
 * Switch Platzi Test theme to default normal.
 */
function changeThemeNormal() {
  removeElementsIfExists(["zen", "ssh"]);
}

/**
 * Switch Platzi Test theme to Zen Mode.
 */
function changeThemeZen() {
  appendStylesheet("zen");
  removeElementsIfExists(["ssh"]);
}

/**
 * Switch Platzi Test theme to SSH Mode.
 */
function changeThemeSSH() {
  appendStylesheet("ssh");
  removeElementsIfExists(["zen"]);
}

/**
 * @description Load shortcuts.
 */
chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
  if (shortcuts) {
    activateShortcutsOnPlatzi();
  }
});

/**
 * @description Load greenboard.
 */
chrome.storage.sync.get("greenboard", ({ greenboard }) => {
  if (greenboard) {
    activateGreenboardOnPlatziTest();
  } else {
    deactivateGreenboardOnPlatziTest();
  }
});

/**
 * @description Load theme.
 */
chrome.storage.sync.get("theme", ({ theme }) => {
  switch (theme) {
    case "normal":
      changeThemeNormal();
      break;
    case "zen":
      changeThemeZen();
      break;
    case "ssh":
      changeThemeSSH();
      break;
    default:
      break;
  }
});
