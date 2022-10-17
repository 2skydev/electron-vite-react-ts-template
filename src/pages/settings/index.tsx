import { Switch } from 'antd';
import { useFormik } from 'formik';
import { useRecoilState, useRecoilValue } from 'recoil';

import LayoutConfig from '~/components/LayoutConfig';
import SaveButton from '~/components/SaveButton';
import Section from '~/components/Section';
import UpdateStatus from '~/components/UpdateStatus';
import { configStore } from '~/stores/config';
import { updateStore } from '~/stores/update';
import { SettingsPageStyled } from '~/styles/pageStyled/settingsPageStyled';

const Settings = () => {
  const [config, setConfig] = useRecoilState(configStore);
  const { version, status } = useRecoilValue(updateStore);

  const formik = useFormik({
    initialValues: config.general,
    onSubmit: values => {
      setConfig({
        ...config,
        general: values,
      });
    },
  });

  return (
    <SettingsPageStyled>
      <LayoutConfig breadcrumbs={['설정', '일반 설정']} />

      <Section
        title="다크모드 설정"
        description={
          <div>
            라이트모드, 다크모드를 선택해서 사용하실 수 있습니다.
            <br />
            다크모드가 기본 설정이며 다크모드를 기준으로 앱이 만들어졌습니다.
          </div>
        }
      >
        <Switch
          checked={formik.values.theme === 'dark'}
          onChange={checked => formik.setFieldValue('theme', checked ? 'dark' : 'light')}
          checkedChildren={<i className="bx bxs-moon" />}
          unCheckedChildren={<i className="bx bxs-sun" />}
        />
      </Section>

      <Section
        title="개발자모드 설정"
        description={
          <div>
            개발자모드를 활성화할지 설정합니다.
            <br />
            개발자모드가 활성화되면 개발자 도구가 활성화됩니다.
          </div>
        }
      >
        <Switch
          checked={formik.values.developerMode}
          onChange={checked => formik.setFieldValue('developerMode', checked)}
          checkedChildren={<i className="bx bx-code-alt" />}
          unCheckedChildren={<i className="bx bx-x" />}
        />
      </Section>

      <Section
        title="앱 버전"
        description={
          <div>
            현재 앱 버전이 몇인지 확인하실 수 있습니다.
            <br />
            아래 링크를 통해 변경된 사항을 확인하실 수 있습니다.
            <br />
            <div className="spacing" />
            <a href="https://github.com/2skydev/electron-vite-react-ts-template/releases" target="_blank" rel="noreferrer">
              앱 릴리즈 목록
            </a>
          </div>
        }
      >
        <UpdateStatus version={version} status={status} />
      </Section>

      <SaveButton defaultValues={config.general} formik={formik} />
    </SettingsPageStyled>
  );
};

export default Settings;
