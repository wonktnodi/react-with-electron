const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

async function createWindow() {
  if (isDev) {
    await installExtensions();
  }
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      webSecurity: false
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  app.setAboutPanelOptions({
    applicationName: "Mook",
    applicationVersion: "0.0.1"
  });

  if (isDev) {
    mainWindow.maximize();
    // auto-open dev tools
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
