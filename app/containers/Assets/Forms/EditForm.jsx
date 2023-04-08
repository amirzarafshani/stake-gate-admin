/*eslint-env jquery*/
import React, { Component, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import assetsService from '../../../services/assetsService';
import SelectAssetStatus from '../../../components/common/base/SelectAssetStatus';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {};

const EditForm = ({ onSubmit, item }) => {
  const handleSubmit = (values, setSubmitting, resetForm) => {
    assetsService
      .edit(values.id, JSON.stringify(values))
      .then((res) => {
        onSubmit();
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <Formik
      enableReinitialize
      initialValues={item}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, setSubmitting, resetForm);
      }}
    >
      {(props) => {
        const {
          values,
          errors,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          handleChange,
          handleSubmit,
        } = props;
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="w-full mb-4">
                <div className="my-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <div
                    className={`mt-1 relative rounded-md shadow-sm border ${
                      errors.status ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <SelectAssetStatus
                      value={values.status}
                      onChange={(val) => setFieldValue('status', val)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn-primary w-full !py-2 md:!w-1/2 !px-20 ${
                    isSubmitting ? 'submitting' : ''
                  }`}
                  disabled={
                    isSubmitting ||
                    (item.status === 'confirmed' &&
                      (values.status === 1 || values.status === 'confirmed'))
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};
export default EditForm;
