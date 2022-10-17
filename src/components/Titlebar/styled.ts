import { lighten } from 'polished';
import styled from 'styled-components';

export const TitlebarStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 25px;
  -webkit-app-region: drag;

  > div {
    width: 35px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.colors.textColor2};
    transition: 200ms color, 200ms background-color;
    -webkit-app-region: no-drag;

    &:hover {
      background-color: ${props => lighten(0.05, props.theme.colors.sidebarBG)};

      &.close {
        background-color: ${props => props.theme.colors.error};
        color: ${props => props.theme.colors.textColor1};
      }
    }

    &.close {
      font-size: 1.2rem;
    }

    &:first-child {
      font-size: 1.2rem;
      i {
        margin-top: 1px;
      }
    }
  }
`;
