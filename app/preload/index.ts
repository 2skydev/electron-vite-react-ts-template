import { ElectronRendererContext } from '@app/types/preload';

const { contextBridge, ipcRenderer } = require('electron');

const electronContext: ElectronRendererContext = {
  onUpdate: callback => ipcRenderer.on('update', (_, event, data) => callback(event, data)),

  initlizeUpdater: () => ipcRenderer.send('initlizeUpdater'),
  appControl: action => ipcRenderer.send('appControl', action),
  openExternal: link => ipcRenderer.send('openExternal', link),
  checkForUpdate: () => ipcRenderer.send('checkForUpdate'),
  quitAndInstall: () => ipcRenderer.send('quitAndInstall'),

  getConfig: () => ipcRenderer.invoke('getConfig'),
  setConfig: config => ipcRenderer.invoke('setConfig', config),

  getVersion: () => ipcRenderer.invoke('getVersion'),
  getUpdaterStatus: () => ipcRenderer.invoke('getUpdaterStatus'),

  getStorePath: () => ipcRenderer.invoke('getStorePath'),
  getLogs: () => ipcRenderer.invoke('getLogs'),
  clearLogs: () => ipcRenderer.invoke('clearLogs'),
};

contextBridge.exposeInMainWorld('electron', electronContext);
