import { Link } from '@tanstack/react-location';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      this is layout!
      <Link to="/">home</Link>/<Link to="/test">test</Link>
      {children}
    </div>
  );
};

export default Layout;
