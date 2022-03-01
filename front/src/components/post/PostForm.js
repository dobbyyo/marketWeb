import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ADD_POST_REQUEST } from '../../reducers/post/postAction';

const Container = styled.div`
  margin-top: 3rem;
  width: 70%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  width: 90%;
  height: 10%;
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 2rem;
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  h1 {
    font-size: 2rem;
    color: #fff;
  }
`;

const Main = styled.div`
  width: 90%;
  height: 75%;
  background-color: #40413b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  input {
    margin-bottom: 2rem;
    width: 70%;
    height: 3rem;
  }
  #description {
    height: 5rem;
  }
  .button {
    width: 30%;
    background-color: #201c2c;
    color: #fff;
    border: none;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onError = (error) => {
    console.log(error);
  };

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      //   data: text,
    });
    reset('');
  });

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Container>
      <Header>
        <h1>Post</h1>
      </Header>
      <Main>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* <label htmlFor="title">제목</label> */}
          <input
            id="title"
            type="text"
            placeholder="Title"
            {...register('title', {
              required: true,
            })}
          />
          {errors.title && errors.title.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}
          {/* <label htmlFor="description">본문</label> */}
          <input
            id="description"
            type="text"
            placeholder="description"
            {...register('description', {
              required: true,
            })}
          />
          {errors.description && errors.description.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}

          <input type="file" multiple hidden ref={imageInput} />
          <input
            type="button"
            value="이미지 업로드"
            onClick={onClickImageUpload}
            accept="image/*"
          />

          <input className="button" type="submit" value="확인" />
        </Form>
      </Main>
    </Container>
  );
};

export default PostForm;
