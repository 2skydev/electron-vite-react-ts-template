import Store from 'electron-store';

export interface ConfigStoreValues {
  general: {
    theme: 'light' | 'dark';
  };
}

export const configStore = new Store<ConfigStoreValues>({
  name: 'config',
  accessPropertiesByDotNotation: false,
  defaults: {
    general: {
      theme: 'dark',
    },
  },
});