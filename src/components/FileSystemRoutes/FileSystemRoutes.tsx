import { Fragment } from 'react';
import { useRoutes, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

type Element = () => JSX.Element;

interface FileSystemRoutesProps {}

interface Module {
  default: Element;
}

const PRESERVED = import.meta.glob<Module>('/src/pages/(_app|404).tsx', { eager: true });
const ROUTES = import.meta.glob<Module>('/src/pages/**/[a-z[]*.tsx', { eager: true });

const preservedRoutes: Partial<Record<string, Element>> = Object.keys(PRESERVED).reduce(
  (routes, key) => {
    const path = key.replace(/\/src\/pages\/|\.tsx$/g, '');
    return { ...routes, [path]: PRESERVED[key]?.default };
  },
  {},
);

const App = preservedRoutes?.['_app'] || Fragment;
const NotFound = preservedRoutes?.['404'] || Fragment;

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: Object.keys(ROUTES).reduce<RouteObject[]>(
      (routes, key) => {
        const module = ROUTES[key];

        const route: RouteObject = {
          element: <module.default />,
        };

        const segments = key
          .replace(/\/src\/pages|\.tsx$/g, '')
          .replace(/\[\.{3}.+\]/, '*')
          .replace(/\[([^\]]+)\]/g, ':$1')
          .split('/')
          .filter(Boolean);

        segments.reduce((parent, segment, index) => {
          const path = segment.replace(/index|\./g, '');
          const root = index === 0;
          const leaf = index === segments.length - 1 && segments.length > 1;
          const node = !root && !leaf;
          const insert = /^\w|\//.test(path) ? 'unshift' : 'push';

          if (root) {
            const dynamic = path.startsWith(':') || path === '*';
            if (dynamic) return parent;

            const last = segments.length === 1;
            if (last) {
              routes.push({ path, ...route });
              return parent;
            }
          }

          if (root || node) {
            const current = root ? routes : parent.children;
            const found = current?.find(route => route.path === path);
            if (found) found.children ??= [];
            else current?.[insert]({ path, children: [] });
            return (
              found || (current?.[insert === 'unshift' ? 0 : current.length - 1] as RouteObject)
            );
          }

          if (leaf) {
            parent?.children?.[insert]({ path, ...route });
          }

          return parent;
        }, {} as RouteObject);

        return routes;
      },
      [{ path: '*', element: <NotFound /> }],
    ),
  },
]);

const FileSystemRoutes = (props: FileSystemRoutesProps) => {
  return <RouterProvider router={router} />;
};

export default FileSystemRoutes;
