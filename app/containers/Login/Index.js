import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../../services/authService';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';
import logo from '../../images/logo.svg';

const Login = (props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  useEffect(() => {
    console.log(props.user);
  }, []);

  const hanldeSubmit = (values) => {
    setIsSubmitting(true);
    let dto = {
      email: values.email,
      password: values.password,
    };
    authService
      .login(dto)
      .then((res) => {
        console.log(res.data);
        props.login(res.data);
        history.push('/dashboard');
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().nullable().required('Required'),
    password: Yup.string().nullable().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    // initialTouched: true,
    // validateOnChange: false,
    // validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      hanldeSubmit(values);
    },
  });

  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="flex justify-center mb-10">
                <img src={logo} className="w-32 h-32 " />
              </div>
              {/* <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Login to Your Account
              </h1> */}
              <div>
                <label className="block text-sm">User Name</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="User Name"
                />
              </div>
              <div className="mb-6">
                <label className="block mt-4 text-sm">Password</label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>

              <button
                type="submit"
                className={`btn-primary ${isSubmitting ? 'submitting' : ''}`}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Login);
