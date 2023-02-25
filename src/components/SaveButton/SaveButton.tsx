import { ReactNode, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button, Popconfirm, Space } from 'antd';
import clsx from 'clsx';
import deepEqual from 'fast-deep-equal';
import { AnimatePresence } from 'framer-motion';

import { UseCustomUseFormReturn } from '~/hooks/useCustomForm';

import { SaveButtonStyled } from './styled';

export interface SaveButtonProps {
  form: UseCustomUseFormReturn<any, any>;
  defaultValues: any;
  className?: string;
  confirmText?: ReactNode;
  useConfirm?: boolean;
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

let timeoutHandle: NodeJS.Timeout;

const SaveButton = ({
  form,
  className,
  defaultValues,
  confirmText,
  useConfirm = false,
}: SaveButtonProps) => {
  const [invalid, setInvalid] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const values = useWatch({
    control: form.control,
  });

  const isEqual = deepEqual(defaultValues, values);

  const handleSave = async () => {
    setLoading(true);

    const valid = await form.submit();

    if (!valid) {
      setInvalid(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    clearTimeout(timeoutHandle);

    if (invalid) {
      timeoutHandle = setTimeout(() => {
        setInvalid(false);
      }, 1000);
    }
  }, [invalid]);

  return (
    <AnimatePresence>
      {!isEqual && (
        <SaveButtonStyled
          className={clsx('SaveButton', className, { invalid })}
          key="SaveButton"
          {...animation}
        >
          <span>저장하지 않은 변경 사항이 있어요!</span>

          <Space>
            <Button className="cancel" disabled={loading} onClick={() => form.reset(defaultValues)}>
              되돌리기
            </Button>

            <Popconfirm
              title={confirmText || '정말 저장하시겠습니까?'}
              okText="저장"
              cancelText="취소"
              placement="topRight"
              open={confirmVisible}
              onOpenChange={(visible: boolean) => {
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
                onClick={useConfirm ? undefined : handleSave}
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
