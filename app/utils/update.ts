import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

import { updateStore } from '../stores/update';

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

export const handleUpdateEvent = (event: UpdateEvent) => {
  return (data?: any) => {
    if (event !== 'download-progress') {
      updateStore.set('status', {
        event,
        data,
        time: new Date().getTime(),
      });
    }

    global.win?.webContents.send('update', event, data);
  };
};

export const initlizeUpdater = () => {
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
};
