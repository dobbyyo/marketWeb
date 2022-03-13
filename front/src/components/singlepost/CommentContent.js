import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

import {
  COMMENT_DELETE_REQUEST,
  COMMENT_UPDATE_REQUEST,
} from '../../reducers/post/postAction';

const Container = styled.div``;

const CommentUser = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.white.row};
  border-bottom: 1px solid #000;
  height: 10rem;
  overflow: scroll;
  margin-bottom: 1rem;
  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
    height: 3rem;
    align-items: center;
  }
  div {
    padding: 1rem 0.4rem;
  }
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    height: 2rem;
  }
`;

const CommentContent = ({ comment }) => {
  const [editMode, setEditMode] = useState(false);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      content: comment.content,
    },
  });

  const onClickUpdate = useCallback(() => {
    setEditMode((cur) => !cur);
  }, []);

  const onClickDelete = useCallback(
    (commentId) => () => {
      console.log(commentId);
      dispatch({
        type: COMMENT_DELETE_REQUEST,
        data: commentId,
      });
    },
    [],
  );

  const onSubmit = useCallback(
    (commentId) => () => {
      const { content } = getValues();
      dispatch({
        type: COMMENT_UPDATE_REQUEST,
        data: { commentId, content },
      });
      setEditMode((cur) => !cur);
    },
    [],
  );
  const onError = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <CommentUser>
        <div className="header">
          {comment.User.nickname && <div>작성자: {comment.User.nickname}</div>}

          {me && me.id === comment.User.id ? (
            <div>
              <button type="button" onClick={onClickUpdate}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button type="button">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={onClickDelete(comment.id)}
                />
              </button>
            </div>
          ) : null}
        </div>

        {editMode ? (
          <div>
            <Form onSubmit={handleSubmit(onSubmit(comment.id), onError)}>
              <input
                id="content"
                name="content"
                type="text"
                {...register('content')}
              />
              <input type="submit" value="확인" />
            </Form>
          </div>
        ) : (
          <div>{comment.content}</div>
        )}
      </CommentUser>
    </Container>
  );
};

CommentContent.propTypes = {
  comment: PropTypes.shape({
    PostId: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    UserId: PropTypes.number,
    content: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CommentContent;
