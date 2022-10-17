import styled from 'styled-components';

export const SectionStyled = styled.div`
  display: flex;
  align-items: flex-start;

  & + .Section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
  }

  > .left {
    width: 30rem;
    margin-right: 2rem;

    h3 {
      font-size: 1.2rem;
    }

    > .description {
      color: ${props => props.theme.colors.textColor2};
    }
  }

  > .content {
    flex: 1;
  }

  .inputs {
    width: 400px;

    .ant-space-item {
      width: 100%;
    }
  }

  .spacing {
    height: 0.6rem;
  }

  .sectionButton {
    display: block;
    margin-top: 1rem;
    width: 20rem;
  }
`;
