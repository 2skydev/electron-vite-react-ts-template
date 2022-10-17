import { Empty } from 'antd';

import LayoutConfig from '~/components/LayoutConfig';
import { NotFoundPageStyled } from '~/styles/pageStyled/404PageStyled';

const NotFound = () => {
  return (
    <NotFoundPageStyled>
      <LayoutConfig breadcrumbs={['페이지를 찾을 수 없습니다 :(']} />
      <Empty description="페이지를 찾을 수 없습니다 :(" />
    </NotFoundPageStyled>
  );
};

export default NotFound;
