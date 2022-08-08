import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';
import Routes from '~/components/Routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <Routes />
  </RecoilRoot>,
);
