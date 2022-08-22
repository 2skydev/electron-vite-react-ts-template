import { ipcMain } from 'electron';

import { configStore } from '../stores/config';

ipcMain.handle('getConfig', async () => {
  return configStore.store;
});

ipcMain.handle('setConfig', async (e, config) => {
  return (configStore.store = config);
});
