import { useEffect } from 'react';

import { Button } from 'antd';
import dayjs from 'dayjs';
import useSWR from 'swr';

import LayoutConfig from '~/components/LayoutConfig';
import LogViewer from '~/components/LogViewer';
import Section from '~/components/Section';
import { SettingsDevelopersPageStyled } from '~/styles/pageStyled/settingsDevelopersPageStyled';

const RELOAD_MINUTE = 1;

const SettingsDevelopers = () => {
  const { data, isValidating, mutate } = useSWR('@app/developers', async () => {
    const storePath = await window.electron.getStorePath();
    const logs = await window.electron.getLogs();

    return {
      storePath,
      logs,
      time: new Date().getTime(),
    };
  });

  const handleClearLogs = async () => {
    await window.electron.clearLogs();
    mutate();
  };

  useEffect(() => {
    if (data && dayjs().diff(dayjs(data.time), 'minute') >= RELOAD_MINUTE) {
      mutate();
    }

    const interval = setInterval(() => {
      mutate();
    }, 1000 * 60 * RELOAD_MINUTE);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SettingsDevelopersPageStyled>
      <LayoutConfig breadcrumbs={['설정', '개발자 옵션']} />

      <Section
        title="데이터 조회일"
        description={
          <div>
            아래 모든 데이터의 조회일입니다.
            <br />
            자동으로 {RELOAD_MINUTE}분에 한번씩 새로고침됩니다.
            <br />
            <div className="spacing" />
            바로 데이터를 업데이트하려면 우측 새로고침 버튼을 눌러주세요.
          </div>
        }
      >
        {data && (
          <div className="date">
            {dayjs(data.time).fromNow()}{' '}
            <span>({dayjs(data.time).format('YYYY.MM.DD / a h시 mm분 ss초')})</span>
            <Button
              className="sectionButton"
              loading={isValidating}
              onClick={() => {
                mutate();
              }}
            >
              새로고침
            </Button>
          </div>
        )}
      </Section>

      <Section title="Store Path" description={<div>설정 및 데이터가 저장되는 경로입니다.</div>}>
        <mark className="selectable">{data?.storePath}</mark>
      </Section>

      <Section
        title="Logs"
        description={
          <div>
            앱에서 남긴 로그들입니다.
            <br />
            필요한 경우 우측 버튼을 통해 로그를 삭제할 수 있습니다.
          </div>
        }
      >
        {data && (
          <>
            <div className="size">
              로그 용량{' '}
              <em>{(data.logs.reduce((acc, item) => acc + item.size, 0) / 1024).toFixed(1)} KB</em>
            </div>

            <Button
              danger
              className="sectionButton"
              loading={isValidating}
              onClick={handleClearLogs}
            >
              로그 비우기
            </Button>
          </>
        )}
      </Section>

      {data && (
        <div className="logs">
          {data.logs.map(log => (
            <LogViewer key={log.path} path={log.path} lines={log.lines} />
          ))}
        </div>
      )}
    </SettingsDevelopersPageStyled>
  );
};

export default SettingsDevelopers;
