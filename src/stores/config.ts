import { atom } from 'recoil';

export interface ConfigStoreValues {
  theme: 'light' | 'dark';
}

export const configStore = atom<ConfigStoreValues>({
  key: 'config',
  default: {
    theme: 'light',
  },
});
