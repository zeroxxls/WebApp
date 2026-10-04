import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  followUserApi,
  unfollowUserApi,
  getFollowersApi,
  getFollowingApi,
  fetchFollowCountsApi,
} from '../../api/followApi';

const containsUser = (userIds = [], userId) =>
  userIds.some((entry) => String(entry?._id || entry) === String(userId));

export const useFollow = (profileUser) => {
  const currentUser = useSelector((state) => state.auth.user);
  const profileUserId = profileUser?._id;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    setIsFollowing(Boolean(currentUser && containsUser(profileUser?.followers, currentUser._id)));
  }, [currentUser, profileUser]);

  useEffect(() => {
    if (!profileUserId) return undefined;

    let isCurrent = true;
    fetchFollowCountsApi(profileUserId)
      .then(({ followers, following }) => {
        if (!isCurrent) return;
        setFollowersCount(followers);
        setFollowingCount(following);
      })
      .catch((error) => {
        console.error('Error fetching follow counts:', error);
      });

    return () => {
      isCurrent = false;
    };
  }, [profileUserId]);

  const toggleFollow = async () => {
    if (!currentUser || !profileUserId || isLoading) return;

    setIsLoading(true);
    try {
      const result = isFollowing
        ? await unfollowUserApi(profileUserId)
        : await followUserApi(profileUserId);

      const nextIsFollowing = !isFollowing;
      setIsFollowing(nextIsFollowing);
      setFollowersCount(
        result.followersCount ?? result.followers ?? Math.max(0, followersCount + (nextIsFollowing ? 1 : -1))
      );
      setFollowingCount(
        result.followingCount ?? result.following ?? Math.max(0, followingCount + (nextIsFollowing ? 1 : -1))
      );
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isFollowing,
    isLoading,
    toggleFollow,
    followersCount,
    followingCount,
    setFollowersCount,
    setFollowingCount,
    getFollowers: () => getFollowersApi(profileUserId),
    getFollowing: () => getFollowingApi(profileUserId),
  };
};
