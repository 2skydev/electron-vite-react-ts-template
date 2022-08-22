import { BrowserWindow, ipcMain, shell } from 'electron';

declare global {
  var win: BrowserWindow | null;
}

export type AppControlAction = 'devtools' | 'minimize' | 'maximize' | 'close';

// 창 닫기, 최대화, 최소화 같은 컨트롤 기능
ipcMain.on('appControl', async (_, action: AppControlAction) => {
  switch (action) {
    case 'devtools': {
      global.win?.webContents.toggleDevTools();
      break;
    }

    case 'minimize': {
      global.win?.minimize();
      break;
    }

    case 'maximize': {
      global.win?.isMaximized() ? global.win?.unmaximize() : global.win?.maximize();
      break;
    }

    case 'close': {
      global.win?.close();
      break;
    }
  }
});

// 기본 브라우저로 링크 열기
ipcMain.on('openExternal', async (_, link) => {
  return shell.openExternal(link);
});
