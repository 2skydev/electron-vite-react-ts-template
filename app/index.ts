import { protocols } from '../electron-builder.json';
import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';

import { join, resolve } from 'path';

import './ipcs/general';
import './ipcs/store';
import './ipcs/update';
import { runDeepLinkResolver } from './utils/deepLink';

global.win = null;

const PROTOCOL = protocols.name;
const IS_MAC = process.platform === 'darwin';
const DEV_URL = `http://localhost:3000`;
const PROD_FILE_PATH = join(__dirname, '../index.html');

const RESOURCES_PATH = app.isPackaged
  ? join(process.resourcesPath, 'resources')
  : join(app.getAppPath(), 'resources');

const icon = nativeImage.createFromPath(
  `${RESOURCES_PATH}/icons/${IS_MAC ? 'logo@512.png' : 'logo@256.ico'}`,
);

const trayIcon = icon.resize({ width: 20, height: 20 });

app.setAsDefaultProtocolClient(PROTOCOL);

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

const createWindow = () => {
  if (global.win) {
    if (global.win.isMinimized()) global.win.restore();
    global.win.focus();
    return;
  }

  global.win = new BrowserWindow({
    icon,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload/index.js'),
    },
  });

  if (app.isPackaged) {
    global.win.loadFile(PROD_FILE_PATH);
  } else {
    global.win.loadURL(DEV_URL);
    global.win?.webContents.toggleDevTools();
  }

  global.win.on('ready-to-show', () => {
    global.win?.show();
  });
};

app.on('activate', () => {
  createWindow();
});

app.on('second-instance', (_, argv) => {
  console.log('second-instance');
  if (!IS_MAC) {
    const url = argv.find(arg => arg.startsWith(`${PROTOCOL}://`));

    if (url) {
      runDeepLinkResolver(url);
    }
  }

  createWindow();
});

app.on('window-all-closed', () => {
  global.win = null;
});

app.on('open-url', (_, url) => {
  runDeepLinkResolver(url);
});

app.whenReady().then(() => {
  createWindow();

  let tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'view app screen', type: 'normal', click: () => createWindow() },
    { type: 'separator' },
    { label: 'quit', role: 'quit', type: 'normal' },
  ]);

  tray.on('double-click', () => createWindow());
  tray.setToolTip('TemplateApp');
  tray.setContextMenu(contextMenu);
});
