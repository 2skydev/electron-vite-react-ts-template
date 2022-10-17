import { ReactNode, useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';

import Layout from '~/components/Layout';
import Titlebar from '~/components/Titlebar';
import { configStore } from '~/stores/config';
import { updateStore } from '~/stores/update';
import { InitGlobalStyled } from '~/styles/init';
import { darkTheme, lightTheme, sizes } from '~/styles/themes';

type Sizes = typeof sizes;
type Colors = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: Sizes;
    colors: Colors;
  }
}

const App = ({ children }: { children: ReactNode }) => {
  const config = useRecoilValue(configStore);
  const [update, setUpdate] = useRecoilState(updateStore);

  const bootstrap = async () => {
    window.electron.onUpdate((event, data) => {
      setUpdate({
        ...update,
        status: {
          event,
          data,
          time: new Date().getTime(),
        },
      });
    });

    window.electron.initlizeUpdater();
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <ThemeProvider
      theme={useMemo(
        () => ({
          sizes: sizes,
          colors: config.general.theme === 'light' ? lightTheme : darkTheme,
        }),
        [config.general.theme],
      )}
    >
      <InitGlobalStyled />

      <div id="app">
        <Titlebar />
        <Layout>{children}</Layout>
      </div>
    </ThemeProvider>
  );
};

export default App;
