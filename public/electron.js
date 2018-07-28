const electron = require('electron');

const Menu = electron.Menu;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const isDev = isEnvSet
  ? getFromEnv
  : process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath);

// const isDev = require('electron-is-dev');
const path = require('path');

if (isDev === true) {
  require('electron-debug')();
}

let mainWindow;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
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
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '/../build/index.html')}`;

  console.log(startUrl);
  console.log(`file://${path.join(__dirname, '/../build/index.html')}`);
  mainWindow.loadURL(startUrl);

  app.setAboutPanelOptions({
    applicationName: 'Moshi Dash',
    applicationVersion: '0.0.1.1122'
  });

  if (isDev) {
    mainWindow.maximize();
    // auto-open dev tools
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));

  // var menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
