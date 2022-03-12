import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';

import {
  LOG_OUT_REQUEST,
  NICKNAME_CHANGE_REQUEST,
  PASSWORD_CHANGE_REQUEST,
} from '../../reducers/user/userAction';

const Container = styled.div`
  width: 100%;
  button {
    width: 100%;
    border: none;
    margin-top: 1rem;
    height: 2rem;
    background-color: #587;
    border-radius: 1rem;
    color: #fff;
    font-size: 1.2rem;
  }
  input {
    width: 100%;
    margin-top: 1rem;
    border-radius: 1.2rem;
  }
`;

const UserForm = () => {
  const [newNickname, setNewNickname] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const dispatch = useDispatch();
  const { passwordChangeDone, passwordChangeLoading } = useSelector(
    (state) => state.user,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onClickNickname = useCallback(() => {
    setNewNickname((cur) => !cur);
  }, [setNewNickname]);
  const onClickPassword = useCallback(() => {
    setNewPassword((cur) => !cur);
  }, [setNewPassword]);

  const onError = (error) => {
    console.log(error);
  };

  const onSubmitNickname = useCallback(() => {
    const { nickname } = getValues();
    dispatch({
      type: NICKNAME_CHANGE_REQUEST,
      data: nickname,
    });
  }, []);

  const onSubmitPassword = useCallback(() => {
    const { currentPassword, changePassword } = getValues();
    dispatch({
      type: PASSWORD_CHANGE_REQUEST,
      data: { currentPassword, changePassword },
    });
  }, []);

  useEffect(() => {
    if (passwordChangeDone && !passwordChangeLoading) {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
      Router.push('/login');
    }
  }, [passwordChangeDone]);

  return (
    <Container>
      <button onClick={onClickNickname} type="button">
        NICKNAME 변경
      </button>
      {newNickname && (
        <form onSubmit={handleSubmit(onSubmitNickname, onError)}>
          <input
            id="nickname"
            type="text"
            placeholder="변경 아이디를 입력해주세요"
            {...register('nickname', {
              required: true,
            })}
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <span style={{ color: 'red' }}>작성해주세요</span>
          )}
          <input type="submit" value="확인" />
        </form>
      )}
      <button onClick={onClickPassword} type="button">
        비밀번호 변경
      </button>
      {newPassword && (
        <form onSubmit={handleSubmit(onSubmitPassword, onError)}>
          <input
            id="currentPassword"
            type="password"
            placeholder="현재 비밀번호를 입력해주세요"
            {...register('currentPassword', {
              required: true,
            })}
          />
          <input
            id="changePassword"
            type="password"
            placeholder="변경 비밀번호를 입력해주세요"
            {...register('changePassword', {
              required: true,
            })}
          />
          <input type="submit" value="확인" />
        </form>
      )}
      <button type="button">회원탈퇴</button>
    </Container>
  );
};

export default UserForm;
