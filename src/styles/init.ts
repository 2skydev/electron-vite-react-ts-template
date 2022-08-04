import { memo } from 'react';

import { createGlobalStyle } from 'styled-components';

export const InitGlobalStyled = memo(createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`);
