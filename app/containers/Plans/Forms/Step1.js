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
      <label className="block text-sm">Plan Name</label>
      <Input type="text" name="name" error={errors.name} />
    </div>

    <div className="mb-4">
      <label className="block text-sm">Days</label>
      <Input type="text" name="days" error={errors.days} />
    </div>

    <div className="mb-4">
      <label className="block text-sm">Profit</label>
      <Input type="text" name="profit" error={errors.profit} />
    </div>

    <div className="mb-4">
      <label className="block text-sm">Penalty</label>
      <Input type="text" name="penalty" error={errors.penalty} />
    </div>

    <div className="mb-4">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="plan_type"
      >
        Plan Type
      </label>
      <SelectPlanType
        onChange={(e) => setFieldValue('plan_type', e)}
        value={values.plan_type}
        error={errors.plan_type}
      />
    </div>

    <button
      type="submit"
      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
    >
      Save
    </button>
  </div>
);
