const fs = require("fs");

const { app, BrowserWindow, dialog } = require("electron");

let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadFile(`${__dirname}/index.html`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});

exports.getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Text Files", extensions: ["txt", "text", "md"] }],
  });

  if (!files) return;

  const file = files[0];
  // We can add await with readFile if the files are too large
  openFile(file);
};

const openFile = (filePath) => {
  const content = fs.readFileSync(filePath).toString();
  mainWindow.webContents.send("file-opened", filePath, content);
};
