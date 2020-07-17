/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import * as yup from 'yup';
import {ProfileChangeNameDTO} from '../../core/profile';
import {FormikForm, FormikFormViewProps, LoadingView} from "rn-mobile-components";

const formSchema = yup.object({
  name: yup.string().required('Please, provide your name').min(2),
});

interface FormViewProfileProps
  extends FormikFormViewProps<ProfileChangeNameDTO> {}

export const FormChangeNameView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    name: {},
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
