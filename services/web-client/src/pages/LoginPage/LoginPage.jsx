import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useAuth } from '../../hooks/useAuth.js';
import LoginInput from '../../components/LoginInput/LoginInput.jsx';
import LoginButton from '../../components/LoginButton/LoginButton.jsx';
import Cat1Icon from '../../icons/Cat1Icon.jsx';
import './LoginPage.css';

const LoginPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
 
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required(t('loginPage.validationErrors.username')),
    }),
    onSubmit: ({ username }) => {
      auth.logIn({ username });
    },
  });

  const loginContainerClass = cn('login-container', {
    'login-container-error': formik.errors.username && formik.touched.username,
  });

  return (
    <div className="login-page-container">
      <div className={loginContainerClass}>
        <Cat1Icon />
        <form onSubmit={formik.handleSubmit} className="login-form-container">
        <h1 id="enter-name" className="text h1-text">{t('loginPage.enterName')}</h1>
          <div className="login-input-container">
            <LoginInput
              valueProp={formik.values.username}
              onChangeProp={formik.handleChange}
              authFailed={formik.errors.username && formik.touched.username}
            />
            {formik.errors.username && formik.touched.username && <div
              id="login-error">
              <p id="login-error-first" className="text sub-text">*</p>
              <p id="login-error-second" className="text sub-text">{formik.errors.username}</p>
            </div>}
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
