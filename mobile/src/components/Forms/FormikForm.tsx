/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import {Button, Input, Text} from 'react-native-elements';
import {View} from 'react-native';

export interface FieldI {
  label: string;
  placeholder?: string;
  type?: 'input' | 'textarea';
  keyboard?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';

  onChange?: (value: string) => void;
  disabled?: boolean;
}

export interface FormikFormViewProps<T> {
  data?: T;
  onSubmit: (values: T) => void;
  isSubmitted: boolean;
}

interface FormikFormProps<T, S> {
  formSchema: yup.ObjectSchema;
  fields: {[T in keyof yup.InferType<S>]: FieldI};
  initialValues: T;
  onSubmit: (values: T) => void;
  onChange?: (event?: React.FormEvent<HTMLFormElement>) => void;
  isSubmitted: boolean;
}

type FieldComponent =
  | string
  | React.ComponentType
  | React.ForwardRefExoticComponent<any>;

export function FormikForm<T, S>({
  formSchema,
  fields,
  initialValues,
  onSubmit,
  isSubmitted,
}: FormikFormProps<T, S>): React.ReactElement {
  // Creates component
  function getComponent(
    name: string,
    f: FieldI,
    {setFieldValue, values, touched, errors}: FormikProps<T>,
  ): React.ReactElement {
    switch (f.type) {
      default:
      case 'input':
      case 'textarea':
        return (
          <View style={{width: '80%'}} key={name}>
            <Input
              label={f?.label}
              placeholder={f.placeholder || f.label}
              onChangeText={(e) => setFieldValue(name, e)}
              key={name}
              //@ts-ignore
              value={values[name] || ''}
              keyboardType={f.keyboard || 'default'}
            />
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'grey'}}>
                {touched[name] ? '' : errors[name]}
              </Text>
            </View>
          </View>
        );
    }
  }

  const fieldsRendered = (props: FormikProps<T>) =>
    Object.entries(fields).map((e) => {
      const name = e[0];
      const f = e[1] as FieldI;
      console.log(props);
      return getComponent(name, f, props);
    });

  return (
    <Formik
      validationSchema={formSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {(props) => (
        <>
          {fieldsRendered(props)}
          <View style={{width: '80%', marginTop: 20}}>
            <Button
              onPress={props.handleSubmit}
              disabled={isSubmitted || !props.isValid}
              title={'Submit'}
            />
          </View>
        </>
      )}
    </Formik>
  );
}
