import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const imageInput = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onError = (error) => {
    console.log(error);
  };

  const onSubmit = useCallback((data) => {
    const { title, content, price, category } = getValues();

    if (!title || !title.trim()) {
      return alert('제목을 적어주세요');
    }
    if (!content || !content.trim()) {
      return alert('설명을 적어주세요');
    }
    if (category === 'none') {
      return alert('카테고리를 정해주세요.');
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        title,
        content,
        price,
        category,
      },
    });
    if (addPostDone) {
      reset('');
    }
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Container>
      <Header>
        <h1>Post</h1>
      </Header>
      <Main>
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          encType="multipart/form-data"
        >
          {/* <label htmlFor="title">제목</label> */}
          <input
            id="title"
            name="title"
            type="text"
            placeholder="제목"
            {...register('title', {
              required: true,
            })}
          />
          {errors.title && errors.title.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}
          {/* <label htmlFor="description">본문</label> */}
          <input
            id="content"
            name="content"
            type="text"
            placeholder="설명"
            {...register('content', {
              required: true,
            })}
          />
          {errors.content && errors.content.type === 'required' && (
            <span style={{ color: 'red' }}>필수로 작성해주세요</span>
          )}

          <input
            id="price"
            name="price"
            type="number"
            placeholder="가격"
            {...register('price', {
              required: true,
            })}
          />
          {errors.price && errors.price.type === 'required' && (
            <span style={{ color: 'red' }}>가격을 작성해주세요</span>
          )}

          <select id="category" name="category" {...register('category')}>
            <option value="none">선택하세요</option>
            <option value="바지">바지</option>
            <option value="002">맨투맨</option>
            <option value="003">아우터</option>
            <option value="004">치마</option>
            <option value="005">원피스</option>
            <option value="006">기타</option>
          </select>

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
