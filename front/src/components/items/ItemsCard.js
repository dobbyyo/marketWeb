import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import ItemImg from './ItemImg';
import { Box, Description, Div, Info, InfoContainer } from './styled';
import { REMOVE_POST_REQUEST } from '../../reducers/post/postAction';

const ItemsCard = ({ post }) => {
  const dispatch = useDispatch();
  // const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  });

  return (
    <Box>
      {id && post.User.id === id ? (
        <>
          <button type="button" onClick={onRemovePost}>
            제거
          </button>
        </>
      ) : (
        <></>
      )}

      {post.Images[0] && (
        <Div>
          <ItemImg images={post.Images} />
        </Div>
      )}
      <InfoContainer>
        <Info>
          <div>{post.title}</div>
          <div>{post.price}</div>
        </Info>
        <Description>{post.content}</Description>
      </InfoContainer>
    </Box>
  );
};

ItemsCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    content: PropTypes.string,
    userId: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    Images: PropTypes.arrayOf(PropTypes.any),
    Comments: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
export default ItemsCard;
