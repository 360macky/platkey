/**
 * @file Manages the features from popup.js.
 */

function getScriptOrStylesheet(name) {
  switch (name) {
    case "greenboard.css":
      return "https://360macky.github.io/platzikey-themes/utils/greenboard.css";
      break;

    default:
      break;
  }
}

/**
 * Check if keyPressed is in values array.
 * @param {Array} values
 * @param {Element} keyPressed
 */
function compareKey(values, keyPressed) {
  return values.indexOf(keyPressed) > -1;
}

/**
 * Click in Platzi Test "Next" Button.
 */
function nextQuestion() {
  const nextStep = document.getElementsByClassName(
    "ControlBar-button ControlBar-button--right"
  )[0];
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
  )[0];
  setTimeout(function () {
    skipQuestion.click();
  }, 200);
  setTimeout(function () {
    skipQuestion.click();
  }, 1000);
}

/**
 * Manages keyboard touches by firing a click() method and calling skipQuestion() and nextQuestion().
 */
function shortcutsOnPlatziTest(event) {
  const options = document.getElementsByClassName("QuestionSelector-options");
  if (compareKey(["A", "a", "1"], event.key)) {
    options[0].children[0].click();
  } else if (compareKey(["B", "b", "2"], event.key)) {
    options[0].children[1].click();
  } else if (compareKey(["C", "c", "3"], event.key)) {
    options[0].children[2].click();
  } else if (compareKey(["D", "d", "4"], event.key)) {
    options[0].children[3].click();
  } else if (compareKey(["E", "e", "5"], event.key)) {
    options[0].children[4].click();
  }
  if (compareKey(["X", "x", "0"], event.key)) {
    skipQuestion();
  } else {
    nextQuestion();
  }
}

/**
 * Enable keyboard shortcuts.
 */
function activateShortcutsOnPlatziTest() {
  window.addEventListener("keydown", shortcutsOnPlatziTest);
}

/**
 * Convert HTML string to HTML template.
 * @param {String} HTML representing a single element.
 * @return {Element}
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 */
function htmlToElement(html) {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * Add greenboard on Platzi test.
 */
function activateGreenboardOnPlatziTest() {
  if (!document.getElementById("greenboardContainer")) {
    let stepsContainer = document.getElementsByClassName("QuestionSelector")[0];
    let greenboardHTML = htmlToElement(`
    <div id="greenboardContainer" class="grid-container">
        <canvas height="300" width="920" id="pkey__canvas"></canvas>
        <section class="options" width="400">
            <input
            id="pkey__inputColor"
              type="color"
              name="strokeStyle"
              value="#98ca3f"
              alt="Elegir color"
              title="Elegir color"
            >
            <button
              id="pkey__clearButton"
              class="clearButton"
              alt="Limpiar"
              title="Limpiar"
            >
              Limpiar
            </button>
        </section>
    </div>`);

    stepsContainer.insertAdjacentElement("beforeend", greenboardHTML);

    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = getScriptOrStylesheet("greenboard.css");
    head.appendChild(link);

    let canvas = document.getElementById("pkey__canvas");
    let canvasContext = canvas.getContext("2d");
    let inputColor = document.getElementById("pkey__inputColor");
    let clearButton = document.getElementById("pkey__clearButton");

    canvasContext.lineJoin = "round";
    canvasContext.lineCap = "round";
    canvasContext.lineWidth = 10;
    canvasContext.strokeStyle = inputColor.value;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
      if (!isDrawing) return;
      canvasContext.beginPath();
      canvasContext.moveTo(lastX, lastY);
      canvasContext.lineTo(e.offsetX, e.offsetY);
      canvasContext.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function handleUpdate() {
      canvasContext.lineWidth = this.value;
      canvasContext.lineCap = this.value;
      canvasContext.strokeStyle = this.value;
    }

    function clearCanvas() {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mouseout", () => (isDrawing = false));
    inputColor.addEventListener("change", handleUpdate);
    clearButton.addEventListener("click", clearCanvas);
  }
}

/**
 * Remove Greenboard from Platzi Test.
 */
function deactivateGreenboardOnPlatziTest() {
  if (document.querySelector(".grid-container")) {
    document
      .getElementsByClassName("QuestionSelector")[0]
      .removeChild(document.querySelector(".grid-container"));
  }
}

/**
 * Append stylesheet link to the head.
 * @param {String} Theme name.
 */
function appendStylesheet(theme) {
  let head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.id = theme;
  link.href = `https://360macky.github.io/platzikey-themes/${theme}.css`;
  head.appendChild(link);
}

/**
 * Remove HTML elements if exists.
 * @param {String} ids
 */
function removeElementsIfExists(ids) {
  for (let index = 0; index < ids.length; index++) {
    const id = ids[index];
    if (document.getElementById(id)) {
      document.getElementById(id).remove();
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
    activateShortcutsOnPlatziTest();
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
