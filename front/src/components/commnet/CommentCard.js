import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ADD_COMMENT_REQUEST } from '../../reducers/post/postAction';
import CommentContent from '../singlepost/CommentContent';

const Container = styled.div`
  width: 100%;
  /* height: 100%; */
`;
const Form = styled.form`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    height: 50%;
  }
`;

const CommentCard = ({ comments }) => {
  const dispatch = useDispatch();
  const { addCommentError, singlePost } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmitComment = useCallback(() => {
    const { content } = getValues();
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content, postId: singlePost.id, userId: id },
    });
    reset();
  }, []);

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Container>
      {comments &&
        comments.map((c) => <CommentContent comment={c} key={c.id} />)}
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

        {addCommentError && (
          <span style={{ color: 'red' }}>{addCommentError}</span>
        )}
        <div>
          <input type="submit" value="확인" />
        </div>
      </Form>
    </Container>
  );
};

CommentCard.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentCard;
