import { app } from 'electron';

import { match, MatchResult } from 'path-to-regexp';

import { ModuleFunction, MyAppType } from '@app/app';

export type DeepLinkResolvers = Record<
  string,
  (matchResult: MatchResult<any>, app: MyAppType) => void
>;

const DeepLinkModule: ModuleFunction = myapp => {
  let resolvers: DeepLinkResolvers = {};

  const resolverFiles = import.meta.glob<{ default: DeepLinkResolvers }>(
    './resolvers/**/*.resolver.ts',
    {
      eager: true,
    },
  );

  for (const resolverFile of Object.values(resolverFiles)) {
    resolvers = { ...resolvers, ...resolverFile.default };
  }

  const runDeepLinkResolver = (url: string) => {
    const pathname = url.replace(`${myapp.PROTOCOL}://`, '/');

    for (const path in resolvers) {
      const data = match(path)(pathname);

      if (data) {
        resolvers[path](data, myapp);
        break;
      }
    }
  };

  app.on('second-instance', (_, argv) => {
    if (!myapp.IS_MAC) {
      const url = argv.find(arg => arg.startsWith(`${myapp.PROTOCOL}://`));

      if (url) {
        runDeepLinkResolver(url);
      }
    }

    myapp.createWindow();
  });

  app.on('open-url', (_, url) => {
    runDeepLinkResolver(url);
  });
};

export default DeepLinkModule;
