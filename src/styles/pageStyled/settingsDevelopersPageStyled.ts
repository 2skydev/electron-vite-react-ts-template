import styled from 'styled-components';

export const SettingsDevelopersPageStyled = styled.div`
  .date {
    > span {
      color: ${props => props.theme.colors.textColor2};
    }
  }

  .logs {
    margin-top: 1rem;
  }
`;
