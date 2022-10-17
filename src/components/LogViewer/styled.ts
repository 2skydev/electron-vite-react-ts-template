import styled from 'styled-components';

export const LogViewerStyled = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.sidebarBG};
  border-radius: 6px;
  color: ${props => props.theme.colors.textColor2};

  .ReactVirtualized__List {
    overflow-x: auto !important;
    width: auto !important;

    .ReactVirtualized__Grid__innerScrollContainer {
      overflow-x: auto !important;
      max-width: initial !important;
    }
  }

  > .path {
    font-weight: bold;
  }

  > .ant-divider {
    margin: 1rem 0;
  }
`;
