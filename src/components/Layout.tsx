import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
