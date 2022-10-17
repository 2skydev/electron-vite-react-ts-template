import styled from 'styled-components';

export const UpdateStatusStyled = styled.div`
  > .version {
    margin-bottom: 1rem;

    span {
      color: ${props => props.theme.colors.textColor2};
    }
  }

  > .description {
    color: ${props => props.theme.colors.textColor2};

    .ant-btn {
      display: block;
      margin-top: 1rem;
      width: 20rem;
    }
  }
`;
