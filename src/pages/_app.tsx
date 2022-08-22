import { ReactNode, useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';

import Layout from '~/components/Layout';
import { configStore } from '~/stores/config';
import { updateStore } from '~/stores/update';
import { InitGlobalStyled } from '~/styles/init';
import { darkTheme, lightTheme, sizes } from '~/styles/themes';

type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const App = ({ children }: { children: ReactNode }) => {
  const {
    general: { theme },
  } = useRecoilValue(configStore);

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
          colors: theme === 'light' ? lightTheme : darkTheme,
        }),
        [theme],
      )}
    >
      <InitGlobalStyled />

      <Layout>
        <main>{children}</main>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
