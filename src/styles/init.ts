import { memo } from 'react';

import { rgba, lighten, darken } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const InitGlobalStyled = createGlobalStyle`
  *::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.scrollTrackBG};
    border-radius: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.scrollThumbBG};
    border-radius: 8px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }

  *::selection {
    background: ${props => props.theme.colors.primary};
  }

  a {
    text-decoration: none;
  }

  .selectable {
    user-select: text;
    -webkit-user-drag: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.colors.textColor1};
  }

  mark {
    background: ${props => props.theme.colors.sidebarBG};
    border-radius: 5px;
    padding: 4px 6px;
    font-size: inherit;
    color: ${props => props.theme.colors.textColor2};
  }

  em {
    text-decoration: none;
    font-style: normal;
    color: ${props => props.theme.colors.primary};
  }

  .successColor {
    color: ${props => props.theme.colors.success};
  }

  .errorColor {
    color: ${props => props.theme.colors.error};
  }

  #app {
    height: 100vh;
    color: ${props => props.theme.colors.textColor1};
  }

  body {
    background-color: ${props => props.theme.colors.sidebarBG};

    .ant-switch {
      height: 28px;
      width: 56px;

      .ant-switch-handle {
        width: 24px;
        height: 24px;

        &::before {
          border-radius: 50%;
        }
      }

      .ant-switch-inner {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .ant-switch-checked {
      background-color: ${props => props.theme.colors.primary};
    }

    .ant-switch-checked .ant-switch-handle {
      left: calc(100% - 24px - 2px);
    }

    .ant-btn {
      border-radius: 4px;
    }

    .rightButtons {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .ant-table {
    background: none;

    .ant-empty-image {
      display: none;
    }

    .ant-empty-description {
      color: ${props => props.theme.colors.textColor2};
    }
  }
  
    .ant-table-tbody > tr.ant-table-placeholder:hover > td {
      background-color: ${props => props.theme.colors.sidebarBG};
    }

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      border: none;
    }

    .ant-table-thead > tr > th {
      background-color: transparent;
      color: ${props => props.theme.colors.textColor2};
      padding-bottom: 10px;
    }

    .ant-table-tbody > tr > td {
      color: ${props => props.theme.colors.textColor1};
      background-color: ${props => props.theme.colors.sidebarBG};
      border-bottom: 6px solid ${props => props.theme.colors.contentBG};

      &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 15px;
      }

      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 15px;
      }
    }

    .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
      display: none;
    }

    .ant-table-tbody > tr.ant-table-row:hover > td {
      background-color: ${props => props.theme.colors.sidebarBG};
    }


    .ant-pagination-options {
      display: none;
    }

    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
      color: ${props => props.theme.colors.textColor2};
    }

    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
      color: ${props => props.theme.colors.primary};
    }

    .ant-select:not(.ant-select-customize-input).ant-select-disabled .ant-select-selector {
      background-color: transparent;
      border-color: ${props => props.theme.colors.borderColor};
      opacity: .3;
    }

    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      background-color: transparent;
      border-color: ${props => props.theme.colors.borderColor};
    }

    .ant-select {
      color: ${props => props.theme.colors.textColor1};
    }
    
    .ant-select-arrow {
      color: ${props => props.theme.colors.textColor1};
      opacity: .7;
      transform: scale(.7);
    }

    .ant-select-show-search.ant-select:not(.ant-select-customize-input)
      .ant-select-selector
      input {
      color: ${props => props.theme.colors.textColor1};
    }

    .ant-select-selection-placeholder {
      color: ${props => props.theme.colors.textColor1};
      opacity: 0.3;
    }

    .ant-select-item {
      color: ${props => props.theme.colors.textColor1};
    }

    .ant-select-dropdown {
      background-color: ${props => props.theme.colors.sidebarBG};
    }

    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: ${props => props.theme.colors.contentBG};
    }

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: ${props => props.theme.colors.selectedBG};
      color: ${props => props.theme.colors.textColor1};
    }

    .ant-select-auto-complete .ant-select-clear {
      right: -5px;
      top: 0;
    }

    .ant-select-clear {
      background: none;
      color: ${props => rgba(props.theme.colors.textColor1, 0.7)};

      &:hover {
        color: ${props => rgba(props.theme.colors.textColor1, 1)};
      }
    }

    .ant-input-number {
      border-color: ${props => props.theme.colors.borderColor};
      background-color: transparent;

      input {
        color: ${props => props.theme.colors.textColor1};

        &::placeholder {
          color: ${props => props.theme.colors.textColor1};
          opacity: 0.3;
        }
      }
    }

    .ant-input-number-handler-wrap {
      background-color: ${props => props.theme.colors.contentBG};
    }

    .ant-input-number-handler {
      border-color: ${props => props.theme.colors.borderColor};

      &:active {
        background-color: ${props => props.theme.colors.sidebarBG};
      }
    }

    .ant-input-number-handler-up-inner, .ant-input-number-handler-down-inner {
      color: ${props => props.theme.colors.textColor1};
    }

    .ant-input-number-handler:hover .ant-input-number-handler-up-inner, .ant-input-number-handler:hover .ant-input-number-handler-down-inner {
      color: ${props => props.theme.colors.primary};
    }

    .ant-input {
      background-color: transparent;
      border-color: ${props => props.theme.colors.borderColor};
      color: ${props => props.theme.colors.textColor1};

      &::placeholder {
        color: ${props => props.theme.colors.textColor1};
        opacity: 0.3;
      }
    }

    .ant-input:hover, .ant-select:hover .ant-select-selector, .ant-input-number:hover {
      border-color: ${props => props.theme.colors.primary} !important;
    }

    .ant-input:focus, .ant-input-focused,
    .ant-select:focus .ant-select-selector, .ant-select-focused .ant-select-selector,
    .ant-input-number:focus, .ant-input-number-focused {
      border-color: ${props => props.theme.colors.primary} !important;
      box-shadow: 0 0 0 2px ${props => rgba(props.theme.colors.primary, 0.2)} !important;
    }

    // 버튼
    .ant-btn {
      background-color: ${props => lighten(0.06, props.theme.colors.contentBG)};
      border-color: ${props => props.theme.colors.borderColor};
      color: ${props => props.theme.colors.textColor1};
    }

    // 버튼 상호작용 상태
    .ant-btn:hover, .ant-btn:focus {
      background-color: ${props => lighten(0.15, props.theme.colors.contentBG)};
      border-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
    }

    // 버튼 로딩 상태
    .ant-btn.ant-btn-loading {
      opacity: 0.6;
      border-color: transparent;
      color: ${props => props.theme.colors.textColor1};
      background-color: ${props => lighten(0.06, props.theme.colors.contentBG)};
    }

    .ant-btn.ant-btn-dangerous {
      border-color: ${props => props.theme.colors.error};
      background-color: transparent;
      color: ${props => props.theme.colors.error};

      &:hover, &:focus {
        background-color: ${props => lighten(0.06, props.theme.colors.contentBG)};
      }
    }

    // 버튼 비활성 상태
    .ant-btn-dangerous.ant-btn-primary[disabled], .ant-btn-dangerous.ant-btn-primary[disabled]:hover, .ant-btn-dangerous.ant-btn-primary[disabled]:focus, .ant-btn-dangerous.ant-btn-primary[disabled]:active {
      border-color: ${props => props.theme.colors.borderColor};
      background-color: ${props => props.theme.colors.contentBG};
      color: ${props => props.theme.colors.textColor2};
      opacity: 0.4;
    }

    .ant-input.noBorder, .ant-select.noBorder .ant-select-selector, .ant-input-number.noBorder {
      border-color: transparent;
    }

    .ant-table-cell-fix-left, .ant-table-cell-fix-right {
      background-color: ${props => props.theme.colors.contentBG};
    }

    .ant-pagination-item {
      border-color: ${props => props.theme.colors.borderColor};
      background-color: ${props => props.theme.colors.sidebarBG};
      
      a {
        color: ${props => props.theme.colors.textColor1};
      }
    }

    .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
      background-color: ${props => props.theme.colors.sidebarBG};
      border-color: ${props => props.theme.colors.borderColor};
      color: ${props => props.theme.colors.textColor1};
    }

    .ant-pagination-prev:focus-visible .ant-pagination-item-link, .ant-pagination-next:focus-visible .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
      border-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
    }

    .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus-visible .ant-pagination-item-link {
      color: ${props => props.theme.colors.textColor2};
      border-color: ${props => props.theme.colors.borderColor};
    }

    .ant-pagination-item-active:focus-visible, .ant-pagination-item-active:hover,
    .ant-pagination-item:focus-visible, .ant-pagination-item:hover {
      border-color: ${props => props.theme.colors.primary};
    }

    .ant-pagination-item-active:focus-visible a, .ant-pagination-item-active:hover a,
    .ant-pagination-item:focus-visible a, .ant-pagination-item:hover a {
      color: ${props => props.theme.colors.primary};
    }

    .ant-pagination-item-active {
      border-color: ${props => props.theme.colors.primary};
    }

    .ant-pagination-item-active a {
      color: ${props => props.theme.colors.primary};
    }

    .ant-notification {
      top: 3rem !important;
    }

    .ant-notification-notice {
      border-radius: 5px;
      padding: 1.5rem 2rem;
      width: 25rem;
      background-color: ${props => lighten(0.1, props.theme.colors.contentBG)};
      color: ${props => darken(0.15, props.theme.colors.textColor1)};

      .ant-notification-notice-message {
        color: ${props => props.theme.colors.textColor1};
      }

      .ant-notification-notice-close {
        color: ${props => props.theme.colors.textColor1};
      }
    }

    .ant-popover-inner {
      background-color: ${props => props.theme.colors.contentBG};

      .ant-popover-title {
        color: ${props => props.theme.colors.textColor1};
        border-color: ${props => props.theme.colors.borderColor};
        padding: .5rem 1rem;
      }

      .ant-popover-inner-content {
        color: ${props => props.theme.colors.textColor1};
      }
    }

    .ant-popover-arrow-content {
      background-color: ${props => props.theme.colors.contentBG};
    }

    .ant-modal-header {
      border-radius: 0;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      border-color: ${props => props.theme.colors.borderColor};
      background-color: ${props => props.theme.colors.contentBG};

      .ant-modal-title {
        color: ${props => props.theme.colors.textColor1};
        opacity: .9;
      }
    }

    .ant-modal-close-x {
      .anticon {
        color: white;
        transform: scale(.8);
      }
    }

    .ant-modal-content {
      border-radius: 1rem;
      background-color: ${props => props.theme.colors.contentBG};
    }

    .ant-modal-body {
      padding: 1.5rem;
    }

    .ant-divider {
      border-color: ${props => props.theme.colors.borderColor};
    }
  }
`;
