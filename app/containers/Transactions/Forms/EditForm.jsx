/*eslint-env jquery*/
import React, { Component, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import releasesService from '../../../services/releasesService';
import SelectReleaseStatus from '../../../components/common/base/SelectReleaseStatus';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {};

const EditForm = ({ onSubmit, item }) => {
  const handleSubmit = (values, setSubmitting, resetForm) => {
    releasesService
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
                {(values.status === 'confirmed' || values.status === 1) && (
                  <div className="my-4">
                    <label
                      htmlFor="transaction_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Transaction Id
                    </label>
                    <div
                      className={`mt-1 relative rounded-md shadow-sm border ${
                        errors.transaction_id
                          ? 'border-red-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="text"
                        name="transaction_id"
                        value={values.transaction_id}
                        onChange={handleChange}
                        className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none"
                        placeholder="Transaction Id"
                      />
                    </div>
                  </div>
                )}

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
                    <SelectReleaseStatus
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
                  disabled={isSubmitting}
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
