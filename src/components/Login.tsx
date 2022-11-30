import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useAppContext } from '../store';

import styles from '../css/Login.module.css';

const editValidationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
});

interface Values {
  username: string;
  password: string;
}

const handleLogin = async (values: any) => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: values.username,
      password: values.password,
    }),
  });

  return await response.json();
};

const handleLogout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

const Login = () => {
  const { state, dispatch, ACTIONS } = useAppContext();
  const userSession = state.userSession;

  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await handleLogout();
    console.log(result);
    if (result.success) {
      dispatch({
        type: ACTIONS.UPDATE_SESSION,
        payload: {
          username: '',
          loggedIn: false,
        },
      });
    }
  };

  return (
    <div className={styles['form-container']} data-testid='login'>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={editValidationSchema}
        onSubmit={async (values: Values) => {
          const result = await handleLogin(values);
          console.log(result);
          if (result.success) {
            dispatch({
              type: ACTIONS.UPDATE_SESSION,
              payload: {
                username: result.username,
                loggedIn: true,
              },
            });
          } else {
            alert(result.Error);
          }
        }}
      >
        {() => (
          <Form>
            <fieldset>
              <legend>
                {!userSession.loggedIn
                  ? `Log in`
                  : `Hi ${userSession.username}`}
              </legend>
              <>
                {!userSession.loggedIn && (
                  <>
                    <div
                      className={styles['form-group']}
                      data-testid='username'
                    >
                      <label htmlFor='username'>Username</label>
                      <Field name='username' />
                      <ErrorMessage
                        className={styles['error-message']}
                        component='div'
                        name='username'
                      />
                    </div>
                    <div
                      className={styles['form-group']}
                      data-testid='password'
                    >
                      <label htmlFor='password'>Password</label>
                      <Field
                        type='password'
                        name='password'
                        autoComplete='off'
                      />
                      <ErrorMessage
                        className={styles['error-message']}
                        component='div'
                        name='password'
                      />
                    </div>
                    <button type='submit'>Login</button>
                  </>
                )}
                {userSession.loggedIn && (
                  <button onClick={logout}>Logout</button>
                )}
              </>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
