/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import * as yup from 'yup';
import {UserCodeDTO} from '../../core/auth';
import {
  FormikForm,
  FormikFormViewProps,
  LoadingView,
} from 'rn-mobile-components';

const formSchema = yup.object({
  code: yup.string().required().min(5),
});

interface FormViewProfileProps extends FormikFormViewProps<UserCodeDTO> {}

export const FormCodeView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    code: {keyboard: 'numeric'},
  };

  if (!data) return <LoadingView />;

  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={(data as unknown) as Record<string, unknown>}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
