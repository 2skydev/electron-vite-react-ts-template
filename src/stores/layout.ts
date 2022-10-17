import { atom } from 'recoil';

export interface LayoutStoreValues {
  breadcrumbs: string[];
}

export const layoutStore = atom<LayoutStoreValues>({
  key: 'layout',
  default: {
    breadcrumbs: [],
  },
});
