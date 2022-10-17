import { ReactNode, useState } from 'react';

import { Button, Popconfirm, Space } from 'antd';
import clsx from 'clsx';
import deepEqual from 'fast-deep-equal';
import { AnimatePresence } from 'framer-motion';

import { SaveButtonStyled } from './styled';

export interface SaveButtonProps {
  formik: any;
  defaultValues: any;
  className?: string;
  confirmText?: ReactNode;
  useConfirm?: boolean;
  reset?: boolean;
}

const animation = {
  initial: {
    opacity: 0,
    y: 100,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: 100,
    transition: {
      ease: 'backIn',
    },
  },

  transition: {
    duration: 0.3,
    ease: 'backOut',
  },
};

const SaveButton = ({
  className,
  defaultValues,
  formik,
  confirmText,
  useConfirm = false,
  reset,
}: SaveButtonProps) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEqual = deepEqual(defaultValues, formik.values);

  const handleSave = async () => {
    setLoading(true);
    await formik.submitForm();
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {!isEqual && (
        <SaveButtonStyled className={clsx('SaveButton', className)} key="SaveButton" {...animation}>
          <span>저장하지 않은 변경 사항이 있어요!</span>

          <Space>
            <Button
              className="cancel"
              onClick={() => (reset ? formik.handleReset() : formik.setValues(defaultValues))}
              disabled={loading}
            >
              되돌리기
            </Button>

            <Popconfirm
              title={confirmText || '정말 저장하시겠습니까?'}
              okText="저장"
              cancelText="취소"
              placement="topRight"
              visible={confirmVisible}
              onVisibleChange={(visible: boolean) => {
                if (useConfirm) {
                  setConfirmVisible(visible);
                }
              }}
              onConfirm={() => {
                handleSave();
                setConfirmVisible(false);
              }}
            >
              <Button
                className="save"
                type="primary"
                loading={loading}
                onClick={useConfirm ? () => {} : handleSave}
              >
                변경사항 저장하기
              </Button>
            </Popconfirm>
          </Space>
        </SaveButtonStyled>
      )}
    </AnimatePresence>
  );
};

export default SaveButton;
