import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from '../../reducers/post/postAction';

import { Container, Form, Header, Main } from './styled';

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

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

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
    const formData = new FormData();
    imagePaths.forEach((img) => {
      formData.append('image', img);
    });
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('category', category);
    // 이미지가 없으면 formData 쓸필요 없다.
    // 하지만 multer를 쓰고 있으므로 사용해봄.

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((event) => {
    console.log('images', event.target.files);
    const imageFormData = new FormData();
    [].forEach.call(event.target.files, (f) => {
      imageFormData.append('image', f);
      // 키 : image => route에 upload.array(내용) 키랑 내용이 같아야한다.
      // 값 : f
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

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
            <option value="맨투맨">맨투맨</option>
            <option value="아우터">아우터</option>
            <option value="치마">치마</option>
            <option value="원피스">원피스</option>
            <option value="기타">기타</option>
          </select>

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
          />

          <div>
            {imagePaths.map((v, i) => (
              <div key={v}>
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

          <input className="button" type="submit" value="확인" />
        </Form>
      </Main>
    </Container>
  );
};

export default PostForm;
