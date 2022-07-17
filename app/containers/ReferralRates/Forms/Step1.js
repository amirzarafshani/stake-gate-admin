import React, { useState, useEffect } from 'react';
// import Checkbox from '../../../components/common/base/Checkbox';
import SelectPlanType from '../../../components/common/base/SelectPlanType';
import Input from '../../../components/common/base/Input';

export default ({
  touched,
  errors,
  setFieldValue,
  values,
  handleChange,
  isSubmitting,
}) => (
  <div className="w-full">
    <div className="mb-4">
      <label className="block text-sm">Referral Count</label>
      <Input type="text" name="referral_count" error={errors.referral_count} />
    </div>

    <div className="mb-4">
      <label className="block text-sm">Profit Rate</label>
      <Input type="text" name="profit_rate" error={errors.profit_rate} />
    </div>

    <button
      type="submit"
      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
    >
      Save
    </button>
  </div>
);
