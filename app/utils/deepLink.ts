import { dialog } from 'electron';

import { MatchResult, match } from 'path-to-regexp';

export type DeepLinkResolvers = Record<string, (data: MatchResult<any>) => void>;

export const runDeepLinkResolver = (url: string) => {
  const pathname = url.replace('templateapp://', '/');

  for (const path in resolvers) {
    const data = match(path)(pathname);

    if (data) {
      resolvers[path](data);
      break;
    }
  }
};

export const resolvers: DeepLinkResolvers = {
  '/test/:id': async ({ params }) => {
    dialog.showMessageBox({
      title: 'Deep Link',
      message: `${params.id}`,
    });
  },
};
