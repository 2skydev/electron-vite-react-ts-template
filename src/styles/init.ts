import { memo } from 'react';

import { darken, lighten, rgba } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const InitGlobalStyled = memo(createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
  }

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

  html {
    line-height: 1.5715;
  }

  body {
    font-size: 14px;
    background-color: ${props => props.theme.colors.sidebarBG};
    color: ${props => props.theme.colors.textColor1};

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

    .rightButtons {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }


    /**
     * antd-table 스타일 커스텀
     */
    .ant-table-wrapper .ant-table {
      background-color: ${props => darken(0.02, props.theme.colors.contentBG)};
    }

    .ant-table-wrapper .ant-table-tbody > tr> td {
      border-radius: 8px;
    }

    .ant-table-wrapper .ant-table-tbody > tr:last-child > td {
      border-bottom: none;
    }

    .ant-table-wrapper .ant-table-thead >tr>th {
      color: ${props => props.theme.colors.textColor2};
    }


    /**
     * antd-radio 스타일 커스텀
     */
    .ant-radio-wrapper {
      color: ${props => props.theme.colors.textColor1};
    }

    .ant-radio-inner {
      background: ${props => props.theme.colors.buttonBG};
      border-color: ${props => props.theme.colors.borderColor};
    }


    /**
     * antd-select 스타일 커스텀
     */
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
      padding: 12px 19px;
      background-color: transparent;
      border-color: ${props => props.theme.colors.borderColor};
      color: ${props => props.theme.colors.textColor1};
      outline: none;
      border-radius: 6px;

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
      background-color: ${props => props.theme.colors.buttonBG};
      border-color: ${props => props.theme.colors.borderColor};
      color: ${props => props.theme.colors.textColor1};
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 250ms;
      box-shadow: none;

      &:not(.ant-btn-icon-only) .bx {
        margin-right: .5rem;
      }
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
    .ant-btn-dangerous.ant-btn-primary[disabled],
    .ant-btn-dangerous.ant-btn-primary[disabled]:hover,
    .ant-btn-dangerous.ant-btn-primary[disabled]:focus,
    .ant-btn-dangerous.ant-btn-primary[disabled]:active,
    .ant-btn[disabled],
    .ant-btn[disabled]:hover,
    .ant-btn[disabled]:focus,
    .ant-btn[disabled]:active {
      border-color: ${props => props.theme.colors.borderColor};
      background-color: ${props => props.theme.colors.contentBG};
      color: ${props => props.theme.colors.textColor2};
      opacity: 0.6;
    }

    .ant-input.noBorder, .ant-select.noBorder .ant-select-selector, .ant-input-number.noBorder {
      border-color: transparent;
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


    /** 
     * ant-popover 스타일 커스텀
     */
    .ant-popover-inner {
      background-color: ${props => props.theme.colors.sidebarBG};
      box-shadow: none;
      border-radius: 7px;
    }

    .ant-popover-message {
      color: ${props => props.theme.colors.textColor1};
      align-items: flex-start;
    }

    .ant-popover-buttons {
      .ant-btn {
        font-size: .75rem;
      }
    }

    .ant-popover-message-icon {
      margin-right: 10px;
    }


    /** 
     * ant-modal 스타일 커스텀
     */
    .ant-modal {
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
        color: ${props => props.theme.colors.textColor1};

        .ant-modal-confirm-title, .ant-modal-confirm-content {
          color: ${props => props.theme.colors.textColor1};
        }

        .ant-btn-primary:not(:disabled):hover,
        .ant-btn-primary:not(:disabled):active {
          background-color: ${props => lighten(0.15, props.theme.colors.contentBG)}
        };
        
      }
    }
  
    .ant-modal-body {
      padding: 1.5rem;
    }
  
    .ant-divider {
      border-color: ${props => props.theme.colors.borderColor};
  
      &.ant-divider-vertical {
        border-color: ${props => lighten(0.1, props.theme.colors.borderColor)};
      }
    }
  }

  /** 
    * ant-form-item 스타일 커스텀
    */
  .ant-form-item {
    width: 100%;
    margin-bottom: .5rem;
    position: relative;
    display: flex;

    .ant-form-item-row {
      width: 100%;
    }

    .ant-form-item-label {
      position: absolute;
      z-index: 10;
      top: .55rem;
      padding-left: 1rem;
      text-align: left;
      
      label {
        color: #8E9297;

        &::after {
          display: none !important;
        }
      }
    }

    .ant-form-item-explain {
      > div {
        line-height: 2.5;
        padding-left: .5rem;
      }

      .bx {
        transform: translateY(1px);
      }
    }

    .ant-form-item-control-input ~ div:last-child > div:nth-child(2) {
      display: none;
    }
    
    .ant-form-item-control-input-content {
      display: flex;
      justify-content: flex-end;
      background: ${props => props.theme.colors.formFieldBG};
      border: 1px solid #232427;
      border-radius: 5px;

      .ant-picker {
        padding: 1rem;
        width: 70%;
        background: transparent;
        border: 0;
        input {
          color: white;
        }
        svg {
          color: white;
        }
      }
      
      .ant-select {
        align-content: flex-end;
        padding: 8px 19px;
        text-align: right;

        .ant-select-selection-item {
          padding-right: .7rem;
        }

        .ant-select-arrow {
          right: 1rem;
        }

        &.ant-select-disabled {

          > div {
            opacity: 1 !important;
          }

          span {
            color: #8E9297;
          }
        }

        .ant-select-selector {
          border: none;
        }
      }
    }

    input {
      padding-left: 7rem;
      text-align: right;
      background: none !important;
      border: none !important;
    }

    input[readonly] {
      color: #8E9297;
    }

    .ant-select-focused .ant-select-selector,
    .ant-select:focus .ant-select-selector {
      border: transparent !important;
      box-shadow: none !important;
    }
  }

  .ant-modal-confirm-body .ant-modal-confirm-title,
  .ant-modal-confirm-body .ant-modal-confirm-content {
    color: ${props => props.theme.colors.textColor1};
  }

  .ant-tag {
    margin-right: 0;

    + .ant-tag {
      margin-left: 8px;
    }

    .bx{
      transform: translateY(1.5px);
      margin-right: 3px;
    }
  }
`);
