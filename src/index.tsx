import ReactDOM from 'react-dom/client';

import { Routes } from 'generouted';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <Routes />
  </RecoilRoot>,
);
