/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import * as yup from 'yup';

import {UserSendCodeDTO} from '../../core/auth';
import {
  FormikForm,
  FormikFormViewProps,
  LoadingView,
} from 'rn-mobile-components';

const formSchema = yup.object({
  phone: yup.string().required('Please, provide your phone').min(5),
});

interface FormViewProfileProps extends FormikFormViewProps<UserSendCodeDTO> {}

export const FormPhoneView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    phone: {keyboard: 'phone-pad'},
  };

  if (!data) return <LoadingView />;

  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={data}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
