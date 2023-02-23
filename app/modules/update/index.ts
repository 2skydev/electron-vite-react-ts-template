import { app, ipcMain } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

import { ModuleFunction } from '@app/app';
import { updateStore } from '@app/stores/update';

export interface UpdateStatus {
  event: UpdateEvent;
  data: any;
  time: number;
}

export type UpdateEvent =
  | 'checking-for-update'
  | 'update-available'
  | 'update-not-available'
  | 'error'
  | 'download-progress'
  | 'update-downloaded';

const UpdateModule: ModuleFunction = ({ window }) => {
  const handleUpdateEvent = (event: UpdateEvent) => {
    return (data?: any) => {
      if (event !== 'download-progress') {
        updateStore.set('status', {
          event,
          data,
          time: new Date().getTime(),
        });
      }

      if (window) {
        window.webContents.send('update', event, data);
      }
    };
  };

  ipcMain.handle('getVersion', async () => {
    return app.getVersion();
  });

  ipcMain.handle('getUpdaterStatus', async () => {
    return updateStore.get('status');
  });

  ipcMain.on('checkForUpdate', async () => {
    autoUpdater.checkForUpdates();
  });

  ipcMain.on('quitAndInstall', async () => {
    autoUpdater.quitAndInstall();
  });

  ipcMain.once('initlizeUpdater', async () => {
    autoUpdater.logger = log;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.fullChangelog = true;

    autoUpdater.on('checking-for-update', handleUpdateEvent('checking-for-update'));
    autoUpdater.on('update-available', handleUpdateEvent('update-available'));
    autoUpdater.on('update-not-available', handleUpdateEvent('update-not-available'));
    autoUpdater.on('download-progress', handleUpdateEvent('download-progress'));
    autoUpdater.on('update-downloaded', handleUpdateEvent('update-downloaded'));
    autoUpdater.on('error', handleUpdateEvent('error'));

    autoUpdater.checkForUpdates();
  });
};

export default UpdateModule;
