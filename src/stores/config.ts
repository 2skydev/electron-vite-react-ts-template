import { ConfigStoreValues } from '@app/stores/config';
import { atom, AtomEffect } from 'recoil';

const appStoreSyncEffect: AtomEffect<ConfigStoreValues> = ({ onSet }) => {
  onSet(newValue => {
    window.electron.setConfig(newValue);
  });
};

export const configStore = atom<ConfigStoreValues>({
  key: 'config',
  default: window.electron.getConfig(),
  effects: [appStoreSyncEffect],
});
