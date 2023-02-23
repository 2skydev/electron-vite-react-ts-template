import { ipcMain, shell } from 'electron';

import { ModuleFunction } from '@app/app';
import { configStore } from '@app/stores/config';

export type AppControlAction = 'devtools' | 'minimize' | 'maximize' | 'close';

const GeneralModule: ModuleFunction = ({ window }) => {
  // 창 닫기, 최대화, 최소화 같은 컨트롤 기능
  ipcMain.on('appControl', async (_, action: AppControlAction) => {
    if (!window) return;

    switch (action) {
      case 'devtools': {
        window.webContents.toggleDevTools();
        break;
      }

      case 'minimize': {
        window.minimize();
        break;
      }

      case 'maximize': {
        window.isMaximized() ? window.unmaximize() : window.maximize();
        break;
      }

      case 'close': {
        window.close();
        break;
      }
    }
  });

  // 링크 열기
  ipcMain.on('openExternal', async (_, link) => {
    return shell.openExternal(link);
  });

  ipcMain.handle('getConfig', async () => {
    return configStore.store;
  });

  ipcMain.handle('setConfig', async (e, config) => {
    return (configStore.store = config);
  });
};

export default GeneralModule;
