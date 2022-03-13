import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

import { Box, Container, Form } from '../components/login/styled';
import { LOG_IN_REQUEST } from '../reducers/user/userAction';

const Login = () => {
  const dispatch = useDispatch();
  const { me, loginError } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // useEffect(() => {
  //   if (logInError) {
  //     alert(logInError);
  //   }
  // }, [logInError]);

  const onSubmit = useCallback(() => {
    const { email, password } = getValues();
    console.log(email, password);
    // dispatch(loginRequestAction({ email, password }));
    return dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password,
      },
    });
  }, [getValues]);

  useEffect(() => {
    if (me) {
      Router.push('/');
    }
  }, [me && me.id]);

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <Box>
        <header>
          <FontAwesomeIcon className="header__icon" icon={faKey} />
          <h2>로그인</h2>
        </header>

        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="mail@address.com"
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}

          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            {...register('password', {
              required: true,
              minLength: {
                value: 1,
                message: 'min length is 5',
              },
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}
          {loginError && <span style={{ color: 'red' }}>{loginError}</span>}
          <div>
            <input type="submit" value="로그인" />
          </div>
        </Form>
      </Box>
    </Container>
  );
};

export default Login;
