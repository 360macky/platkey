<p align="center">
  <img
    src=".github/PlatKeyIcon.png"
    align="center"
    width="100"
    alt="PlatKey"
    title="PlatKey"
  />
  <h1 align="center">PlatKey</h1>
</p>

<p align="center">🚀 Awesome features to your <a href="https://platzi.com">Platzi Exams</a> with this browser extension 🦉.</p>

<p align="center">💚 Open Source, Free, and available for Chrome, Edge, Brave, Arc and Safari 🦁</p>

<p align="center">
  <img
    src=".github/preview.gif"
    align="center"
    width="350"
    alt="Preview of PlatKey"
    title="Preview of PlatKey"
    style="border-radius: 10px"
  />
</p>

<p align="center">
  🤗 Thank you for visiting this browser extension project, help spread it by giving a star! 🌟<br />
  <br />
  <a href="https://github.com/360macky/PlatKey/stargazers"><img src="https://img.shields.io/github/stars/360macky/PlatKey?label=Star%20this%20repository%21&style=social" /></a><br />
</p>

## 🤖 Concept

**PlatKey** is a browser extension that helps you to solve exams faster in Platzi. And also the extension provides new functionalities to improve the experience of taking classes in Platzi.

Briefly the features of PlatKey are:

- **Shortcuts**: Select exam options faster with your own keyboard shortcuts. Also navigate between classes and make contributions using keyboard shortcuts.
- **Greenboard**: Open a fully integrated _whiteboard_ in your exam.
- **Zen Mode**: A new design that reduces the number of buttons and visual elements in the exam.
- **SSH Mode**: A terminal-style design to solve exams as if you were installing a package.
- **Highlight classes**: Select classes you want to highlight in your Student Home.
- **Save contributions**: Save contributions in your Student Home.
- **Spotlight**: A new design for the search bar of Platzi available with a keyboard shortcut.

It supports chromium-based browsers (like Chrome, Edge, Brave, Arc) and WebKit-based browsers (like Safari).

## 🚀 Features

Things you can do with **PlatKey**:

### ⌨ PlatKey Shortcuts

Select exam options faster with your own keyboard. Use letters, and numbers!

### 🖌 PlatKey Greenboard

Open a fully integrated _whiteboard_ in your exam to be able to draw, do calculations or whatever you want.

### 🧐 PlatKey Zen Mode

A new design that reduces the number of buttons and visual elements in the exam.

### 💻 PlatKey SSH Mode

A terminal-style design to solve exams as if you were installing a package.

### New features 👀

The version 3 of PlatKey will come with new features soon...

## 💻 Core Development

PlatKey has a software architecture targeted to be a browser extension for the Chrome Web Store. Since version 3.0 PlatKey adds support for Safari.

PlatKey does not store information of the users. An account is not required to use the extension.

Information related to their extension preferences is stored in the browser's storage.

### 🔭 Control Flow

The `popup.html` file is the extension window. The `popup.js` file is the JavaScript code whose scope is in this window. It executed when the popup es opened.

The `background.js` file only contains the default storage information about the features of PlatKey.

The `content.js` file is executed in background everytime the page is loaded for the `"https://platzi.com/*"`

PlatKey works with these permissions:

- `storage`: To store variables like `shortcuts`, `greenboard`, etc.
- `scripting`: To execute JavaScript scripts inside the page itself.

### ⌨️ Shortcuts Technology

PlatKey [creates an eventlistener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) inside window to listen for keypresses on keys `A`, `B`, `C`, `D`, `E` and `1`, `2`, `3`, `4`, `5` and `6`. Also `X` or `0` key to skip the question.

## 🔩 Installation

### 🚅 Production (recommended)

Go to [PlatKey Extension page](https://chrome.google.com/webstore/detail/PlatKey/bdjedpeffgjikndcihipemgdinpcmpcf?hl=es-419), and click on "Add extension".

It works correctly in Google Chrome, Micorosft Edge and Brave.

## 🏛️ History

This browser extension was made with the motive of **accelerating the speed of exam taking** in Platzi inspired by the way in which Typeform structures the shortcuts of its forms.

### 🦊 Development

If you want the latest features of PlatKey you can install the development version following [this tutorial](https://github.com/360macky/PlatKey/blob/main/INSTALLATION.md).

## 🤲 Contributing

Do you would like to contribute? Do you want to be the author of a new feature? Awesome! please fork the repository and make changes as you like. [Pull requests](https://github.com/360macky/PlatKey/pulls) are warmly welcome.

Also, you can check [Issues](https://github.com/360macky/PlatKey/issues) to get any ideas on how to improve this browser extension.

## 📃 License

The source code is distributed under the MIT License.
See [`LICENSE`](./LICENSE) for more information.
