import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled from 'styled-components';

export const SaveButtonStyled = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: calc(100% - 300px - 4rem);
  padding: 0.8rem 1rem;
  background-color: ${props => props.theme.colors.sidebarBG};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  border-radius: 8px;
  z-index: 100;

  > span {
    font-size: 1rem;
  }

  .ant-btn {
    padding: 6px 15px;
    height: auto;
    border-color: transparent !important;
  }

  .ant-btn:hover,
  .ant-btn:focus {
    color: ${props => props.theme.colors.textColor1};
    border-color: transparent !important;
  }

  .save {
    background-color: ${props => props.theme.colors.success};

    &:hover,
    &:focus {
      background-color: ${props => darken(0.1, props.theme.colors.success)};
    }
  }
`;
