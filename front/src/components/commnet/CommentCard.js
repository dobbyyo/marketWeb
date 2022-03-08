import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ADD_COMMENT_REQUEST } from '../../reducers/post/postAction';

const Container = styled.div`
  width: 80%;
  height: 100%;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    height: 50%;
  }
`;

const CommentCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmitComment = useCallback(() => {
    const { content } = getValues();
    console.log(content);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content, postId: post.id, userId: id },
    });
  }, []);

  const onError = (error) => {
    console.log(error);
  };
  console.log(post);
  return (
    <Container>
      {post.Comments &&
        post.Comments.map((c) => (
          <div>
            {c.content}
            <div>{c.nickname}</div>
          </div>
        ))}
      <Form onSubmit={handleSubmit(onSubmitComment, onError)}>
        <input
          id="content"
          name="content"
          placeholder="댓글을 작성해주세요"
          {...register('content', {
            required: true,
          })}
        />
        {errors.content && errors.content.type === 'required' && (
          <span style={{ color: 'red' }}>댓글을 작성해주세요</span>
        )}
        <div>
          <input type="submit" value="확인" />
        </div>
      </Form>
    </Container>
  );
};

CommentCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentCard;
