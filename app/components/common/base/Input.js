import React from 'react';
import { Field } from 'formik';

export default function Input({ name, type, error }, props) {
  return (
    <Field
      className={`
        w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600
         ${error ? 'border-red-500' : ''}`}
      type={type}
      name={name}
      {...props}
    />
  );
}
