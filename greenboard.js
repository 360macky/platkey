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

function activateGreenboardOnPlatziTest() {
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
  link.href = "https://360macky.github.io/decembrerTest/greenboard.css";
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

activateGreenboardOnPlatziTest();
