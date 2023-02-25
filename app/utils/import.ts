import glob from 'glob';
import { resolve as pathResolve } from 'path';

export interface GlobImportOptions extends glob.IOptions {
  cwd: string;
}

export const globImport = (pattern: string, options: GlobImportOptions) =>
  new Promise<any[]>((resolve, reject) => {
    glob(pattern, options, async (err, paths) => {
      if (err) return reject(err);
      resolve(paths.map(path => require(pathResolve(options.cwd, path))));
    });
  });
