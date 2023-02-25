import { FieldValues, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';

import deepEqual from 'fast-deep-equal';

import { useDidUpdateEffect } from './useDidUpdateEffect';

export interface UseCustomUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> extends UseFormProps<TFieldValues, TContext> {
  onSubmit: (data: TFieldValues) => void;
  syncDefaultValues?: boolean;
}

export interface UseCustomUseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> extends Omit<UseFormReturn<TFieldValues, TContext>, 'handleSubmit'> {
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  submit: () => Promise<boolean>;
}

export const useCustomForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: UseCustomUseFormProps<TFieldValues, TContext>,
): UseCustomUseFormReturn<TFieldValues, TContext> => {
  const { onSubmit, syncDefaultValues = false, ...rest } = props;

  const form = useForm(rest);

  const handleDefaultValuesChange = async () => {
    if (syncDefaultValues) {
      const defaultValues =
        rest.defaultValues instanceof Function ? await rest.defaultValues() : rest.defaultValues;

      if (!deepEqual(rest.defaultValues, form.getValues())) {
        form.reset(defaultValues);
      }
    }
  };

  useDidUpdateEffect(() => {
    handleDefaultValuesChange();
  }, [rest.defaultValues]);

  return {
    ...form,
    handleSubmit: e => {
      form.handleSubmit(onSubmit)(e);
    },
    submit: async () => {
      if (await form.trigger()) {
        await onSubmit(form.getValues());
        return true;
      }

      return false;
    },
  };
};
