import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import {
  REMOVE_IMAGE,
  UPDATE_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
} from '../../reducers/post/postAction';
// import { Form } from '../login/styled';

const Form = styled.form`
  display: grid;
  gap: 0.875rem;
  width: 100%;
  padding: 1.5rem 2rem;
  /* justify-content: center; */
  /* background-color: blue; */
  /* label {
    padding: 0.7rem 0;
  } */
  input,
  select {
    border-radius: 0.2rem;
    background-color: #eee;
    color: #000;
    padding: 0.25rem 0.625rem;
    width: 100%;
  }
  .btn {
    display: block;
    background-color: #201c2c;
    color: #fff;
    font-size: 1.6rem;
    border-radius: 1rem;
    border: none;
    margin: 1rem 0;
    width: 40%;
  }
  .img {
    display: flex;
    justify-content: center;
  }
  .imgContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    height: 80vh;
    width: 80%;
    justify-content: space-around;
    label {
      width: 100%;
      height: 2rem;
    }
    select,
    input {
      height: 4rem;
    }
  }
`;

const Edit = ({ post }) => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
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

    console.log(imagePaths);
    const formData = new FormData();
    imagePaths.forEach((img) => {
      formData.append('image', img);
    });
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('clothes', clothes);
    formData.append('people', people);
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: { data: formData, PostId: post.id },
    });
    Router.back();
  }, [imagePaths]);

  const onError = (error) => {
    console.log(error);
  };

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((event) => {
    console.log('images', event.target.files);
    const imageFormData = new FormData();
    [].forEach.call(event.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

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
        <option value="all">공동</option>
        <option value="man">남성</option>
        <option value="girl">여성</option>
        <option value="child">아동</option>
      </select>

      <div className="imgContainer">
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <input
          type="button"
          value="이미지 업로드"
          onClick={onClickImageUpload}
          accept="image/*"
          className="btn"
        />
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} className="img">
            <img
              src={`http://localhost:3100/${v}`}
              style={{ width: '200px' }}
              alt="img"
            />
            {/* 서버에 Express.static 설정해야함 */}
            <div>
              <button type="button" onClick={onRemoveImage(i)}>
                제거
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="imgContainer">
        <input className="btn" type="submit" value="확인" />
      </div>
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
