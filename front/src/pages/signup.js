import React, { useCallback, useEffect, useState } from 'react';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Form } from '../components/login/styled';
import { SIGN_UP_REQUEST } from '../reducers/user/userAction';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.user);
  const [passwordError, setPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (signUpDone) {
      Router.push('/login');
    }
  }, [signUpDone]);

  const { name, email, password, rePassword } = getValues();
  console.log(name, email, password, rePassword);
  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      if (password !== rePassword) {
        return setPasswordError(true);
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          name,
          email,
          password,
        },
      });
    },
    [name, email, password, rePassword],
  );
  // 나중에 데이터로 바꾸기.

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <Box>
        <header>
          <FontAwesomeIcon className="header__icon" icon={faKey} />
          <h2>회원가입</h2>
        </header>

        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            placeholder="이름"
            {...register('name', {
              required: true,
              pattern: {
                minLength: 1,
                message: '성함을 1글자 이상으로 작성해주세요.',
              },
            })}
          />
          {errors.name && errors.name.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}

          <label htmlFor="nickname">별명</label>
          <input
            id="nickname"
            type="text"
            placeholder="별명"
            {...register('name', {
              required: true,
              pattern: {
                minLength: 1,
                message: '성함을 1글자 이상으로 작성해주세요.',
              },
            })}
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}

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
            placeholder="비밀번호"
            {...register('password', {
              required: true,
              minLength: {
                value: 4,
                message: 'min length is 4',
              },
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <span style={{ color: 'red' }}>최소 4글자입니다.</span>
          )}

          <label htmlFor="rePassword">비밀번호</label>
          <input
            id="rePassword"
            type="password"
            placeholder="비밀번호 확인"
            {...register('rePassword', {
              required: true,
            })}
          />
          {errors.rePassword && errors.rePassword.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}
          {passwordError && (
            <span style={{ color: 'red' }}>비밀번호가 틀렸습니다.</span>
          )}

          <select {...register('gender')}>
            <option value="female">여자</option>
            <option value="male">남자</option>
            <option value="other">예외</option>
          </select>

          {errors.gender && errors.gender.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}
          <div>
            <input type="submit" value="로그인" />
          </div>
        </Form>
      </Box>
    </Container>
  );
};

export default Signup;
