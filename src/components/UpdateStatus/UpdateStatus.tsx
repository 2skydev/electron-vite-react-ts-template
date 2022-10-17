import { useEffect, useState } from 'react';

import { Button } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { UpdateStatus as UpdateStatusType } from '@app/modules/update';

import { UpdateStatusStyled } from './styled';

export interface UpdateStatusProps {
  version: string;
  status: UpdateStatusType;
  className?: string;
}

const UpdateStatus = ({ className, version, status }: UpdateStatusProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckForUpdate = () => {
    setIsLoading(true);
    window.electron.checkForUpdate();
  };

  const handleUpdateNow = () => {
    setIsLoading(true);
    window.electron.quitAndInstall();
  };

  useEffect(() => {
    if (status.event === 'checking-for-update') {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <UpdateStatusStyled className={clsx('UpdateStatus', className)}>
      <div className="version">
        현재버전 <em>v{version}</em>
      </div>

      <div className="description">
        {status.event === 'checking-for-update' && <>업데이트를 확인중입니다...</>}

        {status.event === 'update-available' && <>업데이트가 있습니다. 다운로드중입니다...</>}

        {status.event === 'update-not-available' && (
          <>
            최신 버전입니다. ({dayjs(status.time).fromNow()})
            <Button loading={isLoading} onClick={handleCheckForUpdate}>
              업데이트 확인
            </Button>
          </>
        )}

        {status.event === 'error' && (
          <>
            업데이트를 확인하는 도중 오류가 발생했습니다.
            <Button onClick={handleCheckForUpdate}>업데이트 확인</Button>
          </>
        )}

        {status.event === 'download-progress' && (
          <>{Number(status.data.percent).toFixed(1)}% 다운로드중입니다...</>
        )}

        {status.event === 'update-downloaded' && (
          <>
            업데이트가 다운로드 되었습니다.
            <br />
            앱을 재시작하면 업데이트가 적용됩니다.
            <Button onClick={handleUpdateNow}>지금 설치</Button>
          </>
        )}
      </div>
    </UpdateStatusStyled>
  );
};

export default UpdateStatus;
