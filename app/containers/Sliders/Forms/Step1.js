import React, { useState, useEffect } from 'react';
import Input from '../../../components/common/base/Input';
import Upload from '../../../components/common/base/Upload';

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
      <label className="block text-sm">Slider Name</label>
      <Input type="text" name="name" error={errors.name} />
    </div>

    <div className="mb-4">
      <Upload
        error={errors.image}
        label="Image"
        onChange={(e) => setFieldValue('image', e.target.files[0])}
        name="image"
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
