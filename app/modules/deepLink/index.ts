import { app } from 'electron';

import { match, MatchResult } from 'path-to-regexp';

import { ModuleFunction, AppContextType } from '@app/app';
import { globImport } from '@app/utils/import';

export type DeepLinkResolvers = Record<
  string,
  (matchResult: MatchResult<any>, app: AppContextType) => void
>;

const DeepLinkModule: ModuleFunction = async context => {
  const modules = await globImport('./resolvers/**/*.resolver.js', { cwd: __dirname });

  const resolvers: DeepLinkResolvers = modules.reduce((resolvers, module) => {
    return { ...resolvers, ...module.default };
  }, {});

  const runDeepLinkResolver = (url: string) => {
    const pathname = url.replace(`${context.PROTOCOL}://`, '/');

    for (const path in resolvers) {
      const data = match(path)(pathname);

      if (data) {
        resolvers[path](data, context);
        break;
      }
    }
  };

  app.on('second-instance', (_, argv) => {
    if (!context.IS_MAC) {
      const url = argv.find(arg => arg.startsWith(`${context.PROTOCOL}://`));

      if (url) {
        runDeepLinkResolver(url);
      }
    }

    context.createWindow();
  });

  app.on('open-url', (_, url) => {
    runDeepLinkResolver(url);
  });
};

export default DeepLinkModule;
