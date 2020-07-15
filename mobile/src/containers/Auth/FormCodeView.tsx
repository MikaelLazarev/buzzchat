/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import * as yup from 'yup';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';
import {Loading} from '../../components/Loading';
import {UserCodeDTO} from '../../core/auth';

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

  if (!data) return <Loading />;

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
