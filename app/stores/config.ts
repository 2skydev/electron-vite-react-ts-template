import Store from 'electron-store';

export interface ConfigStoreValues {
  general: {
    developerMode: boolean;
  };
}

export const configStore = new Store<ConfigStoreValues>({
  name: 'config',
  accessPropertiesByDotNotation: false,
  defaults: {
    general: {
      developerMode: false,
    },
  },
});
