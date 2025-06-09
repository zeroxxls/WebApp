import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  followUserApi,
  unfollowUserApi,
  getFollowersApi,
  getFollowingApi,
  fetchFollowCountsApi,
} from '../../api/followApi';
import { checkMutualFollowApi } from '../../utils/mutualFollowUtils';

export const useFollow = (profileUserId) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isMutualFollow, setIsMutualFollow] = useState(false);

  useEffect(() => {
    if (currentUser && profileUserId) {
      const following = currentUser.following?.includes(profileUserId) || false;
      setIsFollowing(following);
      if (following) checkMutualFollow();
      fetchFollowCounts();
    }
  }, [currentUser, profileUserId]);

  const checkMutualFollow = async () => {
    try {
      const isMutual = await checkMutualFollowApi(profileUserId, currentUser._id);
      setIsMutualFollow(isMutual);
    } catch (error) {
      console.error("Error checking mutual follow:", error);
    }
  };

  const fetchFollowCounts = async () => {
    try {
      const { followers, following } = await fetchFollowCountsApi(profileUserId);
      setFollowersCount(followers);
      setFollowingCount(following);
    } catch (error) {
      console.error("Error fetching follow counts:", error);
    }
  };

  const toggleFollow = async () => {
    if (!currentUser || !profileUserId || isLoading) return;

    setIsLoading(true);
    try {
      if (isFollowing) {
        await unfollowUserApi(profileUserId);
        setIsFollowing(false);
        setIsMutualFollow(false);
        setFollowersCount(prev => Math.max(0, prev - 1));
      } else {
        await followUserApi(profileUserId);
        setIsFollowing(true);
        await checkMutualFollow();
        setFollowersCount(prev => prev + 1);
      }

      await fetchFollowCounts();
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isFollowing,
    isLoading,
    isMutualFollow,
    toggleFollow,
    followersCount,
    followingCount,
    setFollowersCount,
    setFollowingCount,
    getFollowers: () => getFollowersApi(profileUserId),
    getFollowing: () => getFollowingApi(profileUserId),
  };
};
