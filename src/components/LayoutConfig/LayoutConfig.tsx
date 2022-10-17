import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { layoutStore } from '~/stores/layout';

export interface LayoutConfigProps {
  breadcrumbs: string[];
}

const LayoutConfig = ({ breadcrumbs }: LayoutConfigProps) => {
  const [layout, setLayout] = useRecoilState(layoutStore);

  useEffect(() => {
    setLayout({
      ...layout,
      breadcrumbs,
    });
  }, [breadcrumbs]);

  return null;
};

export default LayoutConfig;
