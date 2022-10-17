import clsx from 'clsx';

import Content from '../Content';
import Sidebar from '../Sidebar';
import { LayoutStyled } from './styled';

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ className, children }: LayoutProps) => {
  return (
    <LayoutStyled className={clsx('Layout', className)}>
      <Sidebar />
      <Content>{children}</Content>
    </LayoutStyled>
  );
};

export default Layout;
