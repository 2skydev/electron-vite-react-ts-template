import { atom } from 'recoil';

export interface SearchStoreValues {
  status: {
    id: string;
    status: string;
    description: string;
  };
}

export const searchStore = atom<SearchStoreValues>({
  key: 'search',
  default: {
    status: {
      id: 'loadConfig',
      status: 'warning',
      description: '설정을 불러오고 있어요 기다려주세요 :)',
    },
  },
});
