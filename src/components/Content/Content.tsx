import { useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { layoutStore } from '~/stores/layout';

import { ContentStyled } from './styled';

export interface ContentProps {
  className?: string;
  children: React.ReactNode;
}

const Content = ({ className, children }: ContentProps) => {
  const { breadcrumbs } = useRecoilValue(layoutStore);
  const { pathname } = useLocation();

  return (
    <ContentStyled className={clsx('Content', className)}>
      <div className="header">
        <i className="bx bx-hash" />

        <motion.span
          initial={{ opacity: 0, x: 3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          key={pathname}
        >
          {breadcrumbs.map((text, i) => (
            <span key={text + i}>{text}</span>
          ))}
        </motion.span>
      </div>

      <div className="content">
        <AnimatePresence>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </ContentStyled>
  );
};

export default Content;
