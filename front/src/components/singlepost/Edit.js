import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import { UPDATE_POST_REQUEST } from '../../reducers/post/postAction';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    padding: 0.7rem 0;
  }
  .btn {
    display: block;
    background-color: #201c2c;
    color: #fff;
    font-size: 1.6rem;
    border-radius: 1rem;
    border: none;
    margin: 1rem 0;
  }
`;

const Edit = ({ post }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
      price: post.price,
      clothes: post.clothes,
      people: post.people,
    },
  });

  const onSubmit = useCallback(() => {
    const { title, content, price, clothes, people } = getValues();
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: { title, content, price, clothes, people, PostId: post.id },
    });
    Router.replace('/girl');
  }, [post]);

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      encType="multipart/form-data"
    >
      <label htmlFor="title">제목</label>
      <input
        id="title"
        name="title"
        type="text"
        {...register('title', {
          required: true,
        })}
      />
      {errors.title && errors.title.type === 'required' && (
        <span style={{ color: 'red' }}>필수로 작성해주세요</span>
      )}
      <label htmlFor="content">설명</label>
      <input
        id="content"
        name="content"
        type="text"
        {...register('content', {
          required: true,
        })}
      />
      {errors.content && errors.content.type === 'required' && (
        <span style={{ color: 'red' }}>필수로 작성해주세요</span>
      )}

      <label htmlFor="price">가격</label>
      <input
        id="price"
        name="price"
        type="number"
        {...register('price', {
          required: true,
        })}
      />
      {errors.price && errors.price.type === 'required' && (
        <span style={{ color: 'red' }}>가격을 작성해주세요</span>
      )}

      <label htmlFor="clothes">옷 종류</label>
      <select id="clothes" name="clothes" {...register('clothes')}>
        <option value="none" disabled>
          선택하세요
        </option>
        <option value="바지">바지</option>
        <option value="맨투맨">맨투맨</option>
        <option value="아우터">아우터</option>
        <option value="치마">치마</option>
        <option value="원피스">원피스</option>
        <option value="기타">기타</option>
      </select>

      <label htmlFor="people">용도</label>
      <select id="people" name="people" {...register('people')}>
        <option value="none" disabled>
          선택하세요
        </option>
        <option value="공동">공동</option>
        <option value="남성">남성</option>
        <option value="여성">여성</option>
        <option value="아동">아동</option>
      </select>

      <input className="btn" type="submit" value="확인" />
    </Form>
  );
};

Edit.propTypes = {
  post: PropTypes.shape({
    Comment: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    UserId: PropTypes.number,
    clothes: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    people: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string,
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Edit;
