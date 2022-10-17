import { ipcMain } from 'electron';
import log from 'electron-log';

import { ModuleFunction } from '@app/app';
import { configStore } from '@app/stores/config';

export interface Log {
  size: number;
  path: string;
  lines: string[];
}

const DeveloperModule: ModuleFunction = () => {
  ipcMain.handle('getStorePath', async () => {
    return configStore.path;
  });

  ipcMain.handle('getLogs', async () => {
    const logs = log.transports.file.readAllLogs();

    return logs.map(item => ({
      size: log.transports.file.getFile().size,
      path: item.path,
      lines: item.lines.filter(Boolean),
    }));
  });

  ipcMain.handle('clearLogs', async () => {
    return log.transports.file.getFile().clear();
  });
};

export default DeveloperModule;
