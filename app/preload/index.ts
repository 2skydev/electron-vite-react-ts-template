import { contextBridge, ipcRenderer } from 'electron';

import { AppControlAction } from '../ipcs/general';
import { ConfigStoreValues } from '../stores/config';
import { UpdateEvent, UpdateStatus } from '../utils/update';

export interface ElectronRendererContext {
  // general
  openExternal: (link: string) => void;
  appControl: (action: AppControlAction) => void;

  // update
  initlizeUpdater: () => void;
  checkForUpdate: () => void;
  quitAndInstall: () => void;
  getVersion: () => Promise<string>;
  getUpdateStatus: () => Promise<UpdateStatus>;
  onUpdate: (callback: (event: UpdateEvent, data: any) => void) => void;

  // config store
  getConfig: () => Promise<ConfigStoreValues>;
  setConfig: (config: ConfigStoreValues) => Promise<ConfigStoreValues>;
}

const electronContext: ElectronRendererContext = {
  appControl: action => ipcRenderer.send('appControl', action),
  openExternal: link => ipcRenderer.send('openExternal', link),

  initlizeUpdater: () => ipcRenderer.send('initlizeUpdater'),
  checkForUpdate: () => ipcRenderer.send('checkForUpdate'),
  quitAndInstall: () => ipcRenderer.send('quitAndInstall'),
  getVersion: () => ipcRenderer.invoke('getVersion'),
  getUpdateStatus: () => ipcRenderer.invoke('getUpdateStatus'),
  onUpdate: callback => ipcRenderer.on('update', (_, event, data) => callback(event, data)),

  getConfig: () => ipcRenderer.invoke('getConfig'),
  setConfig: config => ipcRenderer.invoke('setConfig', config),
};

contextBridge.exposeInMainWorld('electron', electronContext);
