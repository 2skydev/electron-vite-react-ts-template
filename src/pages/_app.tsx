import { ReactNode } from 'react';

import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';

import Layout from '~/components/Layout';
import { configStore } from '~/stores/config';
import { InitGlobalStyled } from '~/styles/init';
import { darkTheme, lightTheme, sizes } from '~/styles/themes';

type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const App = ({ children }: { children: ReactNode }) => {
  const { theme } = useRecoilValue(configStore);

  return (
    <ThemeProvider
      theme={{
        sizes: sizes,
        colors: theme === 'light' ? lightTheme : darkTheme,
      }}
    >
      <InitGlobalStyled />

      <Layout>
        <main>{children}</main>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
