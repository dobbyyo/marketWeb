import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import {
  ADD_COMMENT_REQUEST,
  LOAD_POST_REQUEST,
} from '../../reducers/post/postAction';

const Container = styled.div`
  width: 100%;
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

const CommentUser = styled.div`
  /* display: flex; */
  /* border: 1px solid #000; */
  width: 100%;
  background-color: ${(props) => props.theme.white.row};
  border-bottom: 1px solid #000;
  height: 10rem;
  overflow: scroll;

  div {
    /* margin: 1rem 1rem; */
    padding: 1rem 0.4rem;
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
  const router = useRouter();
  const { postId } = router.query;
  console.log(postId);

  const onSubmitComment = useCallback(() => {
    const { content } = getValues();
    console.log(content);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content, postId: post.id, userId: id },
    });
    dispatch({
      type: LOAD_POST_REQUEST,
      data: postId,
    });
  }, []);

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Container>
      {post.Comments &&
        post.Comments.map((c) => (
          <CommentUser key={c.id}>
            <>
              <div>작성자: {c.User.nickname}</div>
              <div>{c.content}</div>
            </>
          </CommentUser>
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
