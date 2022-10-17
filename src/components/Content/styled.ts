import styled from 'styled-components';

export const ContentStyled = styled.div`
  width: calc(100% - 300px);
  background-color: ${props => props.theme.colors.contentBG};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  > .header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;

    i {
      font-size: 1.3rem;
      margin-right: 0.5rem;
      color: ${props => props.theme.colors.textColor2};
    }

    > span {
      margin-bottom: -1px;

      > span {
        & + span::before {
          content: '/';
          display: inline-block;
          margin: 0 0.3rem;
          font-weight: bold;
          color: ${props => props.theme.colors.textColor2};
        }
      }
    }
  }

  > .content {
    padding: 3rem 2rem;
    overflow-y: auto;
    max-height: calc(100% - 73px - 10px);
    margin: 5px 5px 5px 0;
  }
`;
