import { app, BrowserWindow } from 'electron';

import { join } from 'path';

global.win = null;

const DEV_URL = `http://localhost:3000`;
const PROD_FILE_PATH = join(__dirname, '../index.html');

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

  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (app.isPackaged) {
    win.loadFile(PROD_FILE_PATH);
  } else {
    win.webContents.openDevTools();
    win.loadURL(DEV_URL);
  }
};

app.on('activate', () => {
  createWindow();
});

app.on('second-instance', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  global.win = null;
});

app.whenReady().then(() => {
  createWindow();
});
