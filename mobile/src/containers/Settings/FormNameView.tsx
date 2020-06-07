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
import {ProfileChangeNameDTO} from '../../core/profile';

const formSchema = yup.object({
  name: yup.string().required().min(3),
});

interface FormViewProfileProps
  extends FormikFormViewProps<ProfileChangeNameDTO> {}

export const FormChangeNameView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    name: {

    },
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
