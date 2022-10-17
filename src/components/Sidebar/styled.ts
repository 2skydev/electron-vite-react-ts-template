import styled from 'styled-components';

export const SidebarStyled = styled.div`
  min-width: 300px;
  width: 300px;
  background-color: ${props => props.theme.colors.sidebarBG};
  color: ${props => props.theme.colors.textColor2};

  .logo {
    margin-bottom: 2rem;
    padding: 2rem 2rem 0 2rem;
    font-family: 'Aquatico';
    font-size: 1.6rem;
    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
    }
  }

  .menus {
    .menuGroup {
      padding: 1.5rem 2rem;

      & + .menuGroup {
        border-top: 1px solid ${props => props.theme.colors.borderColor};
      }

      .title {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        font-weight: bold;
      }

      a {
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.textColor2};
        width: 100%;
        height: 3rem;
        border-radius: 8px;
        padding: 0 1rem;
        transition: 300ms background-color;
        font-weight: bold;
        position: relative;

        & + a {
          margin-top: 0.3rem;
        }

        &.active .bx {
          color: ${props => props.theme.colors.primary};
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }

        .bx,
        span {
          position: relative;
          z-index: 1;
        }

        .bx {
          font-size: 1.4rem;
          margin-right: 0.5rem;
          transition: 200ms color;
        }

        span {
          margin-bottom: -1px;
        }

        .menuActiveBG {
          position: absolute;
          background-color: ${props => props.theme.colors.contentBG};
          width: 100%;
          height: 100%;
          border-radius: 8px;
          left: 0;
          top: 0;
          z-index: 0;
        }
      }
    }
  }
`;
