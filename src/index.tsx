import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { ElectronRendererContext } from '@app/preload';
import { RecoilRoot } from 'recoil';

import FileSystemRoutes from './components/FileSystemRoutes';

declare global {
  interface Window {
    electron: ElectronRendererContext;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <RecoilRoot>
      <Suspense>
        <FileSystemRoutes />
      </Suspense>
    </RecoilRoot>
  </HashRouter>,
);
