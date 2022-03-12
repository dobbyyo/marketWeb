import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  FOLLOW_REQUEST,
  LOAD_USER_REQUEST,
  UNFOLLOW_REQUEST,
} from '../../reducers/user/userAction';

const Button = styled.button`
  width: 40%;
  color: ${(props) => props.theme.white.top};
  background-color: #3a51ff;
  border: none;
`;

const FollowBtn = () => {
  const dispatch = useDispatch();
  const { me, userInfo, followDone, unfollowDone } = useSelector(
    (state) => state.user,
  );
  let isFollowing = false;
  if (me && userInfo) {
    isFollowing = me?.Followings.find((v) => v.id === userInfo.id);
  }
  const router = useRouter();
  const { id } = router.query;
  const [userOk, setUserOk] = useState(false);

  useEffect(() => {
    if (me && userInfo) {
      if (me.id !== userInfo.id) {
        setUserOk(true);
      }
    }
  }, [me]);

  const onClickBtn = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: userInfo.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: userInfo.id,
      });
    }
  }, [isFollowing]);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
  }, [followDone, unfollowDone]);

  return (
    <>
      {userOk && (
        <Button onClick={onClickBtn}>
          {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
      )}
    </>
  );
};
// {me.id !== id && <FollowBtn />}

export default FollowBtn;
