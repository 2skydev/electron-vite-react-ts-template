import { app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

import { updateStore } from '../stores/update';
import { initlizeUpdater } from '../utils/update';

ipcMain.handle('getVersion', async () => {
  return app.getVersion();
});

ipcMain.handle('getUpdateStatus', async () => {
  return updateStore.get('status');
});

ipcMain.on('checkForUpdate', async () => {
  autoUpdater.checkForUpdates();
});

ipcMain.on('quitAndInstall', async () => {
  autoUpdater.quitAndInstall();
});

ipcMain.once('initlizeUpdater', async () => {
  initlizeUpdater();
});
