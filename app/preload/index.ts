import { contextBridge, ipcRenderer } from 'electron';

import { Log } from '../modules/developers';
import { AppControlAction } from '../modules/general';
import { UpdateEvent, UpdateStatus } from '../modules/update';
import { ConfigStoreValues } from '../stores/config';

export interface ElectronRendererContext {
  onUpdate: (callback: (event: UpdateEvent, data: any) => void) => void;

  initlizeUpdater: () => void;
  appControl: (action: AppControlAction) => void;
  openExternal: (link: string) => void;
  checkForUpdate: () => void;
  quitAndInstall: () => void;

  getConfig: () => Promise<ConfigStoreValues>;
  setConfig: (config: ConfigStoreValues) => Promise<ConfigStoreValues>;

  getVersion: () => Promise<string>;
  getUpdaterStatus: () => Promise<UpdateStatus>;

  getStorePath: () => Promise<string>;
  getLogs: () => Promise<Log[]>;
  clearLogs: () => Promise<boolean>;
}

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
