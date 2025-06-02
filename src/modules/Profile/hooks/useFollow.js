import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useFollow = (profileUserId) => {
    const currentUser = useSelector((state) => state.auth.user);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        if (currentUser && profileUserId) {
            setIsFollowing(currentUser.following?.includes(profileUserId) || false);
            // Возможно, стоит запросить количество подписчиков/подписок при монтировании компонента или при изменении profileUserId
            fetchFollowCounts(profileUserId);
        }
    }, [currentUser, profileUserId]);

    const fetchFollowCounts = async (userId) => {
        try {
            const followersResponse = await getFollowersApi(userId);
            setFollowersCount(followersResponse.followers.length);
            const followingResponse = await getFollowingApi(userId);
            setFollowingCount(followingResponse.following.length);
        } catch (error) {
            console.error("Error fetching follow counts:", error);
        }
    };

    const getFollowersApi = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4444/users/${userId}/followers`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to get followers');
            }
            return await response.json();
        } catch (error) {
            console.error('Error getting followers:', error);
            throw error;
        }
    };

    const getFollowingApi = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4444/users/${userId}/following`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to get following');
            }
            return await response.json();
        } catch (error) {
            console.error('Error getting following:', error);
            throw error;
        }
    };

    const followUserApi = async (followId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:4444/users/${followId}/follow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to follow user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error following user:', error);
            throw error;
        }
    };

    const unfollowUserApi = async (unfollowId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:4444/users/${unfollowId}/unfollow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to unfollow user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error unfollowing user:', error);
            throw error;
        }
    };

    const toggleFollow = async () => {
        if (!currentUser || !profileUserId || isLoading) return;

        setIsLoading(true);
        try {
            let response;
            if (isFollowing) {
                response = await unfollowUserApi(profileUserId);
                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
            } else {
                response = await followUserApi(profileUserId);
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
            }
            // После успешной подписки/отписки, возможно, стоит обновить данные пользователя в Redux
            console.log('Follow toggle response:', response);
            // Обновляем количество подписчиков/подписок после действия
            fetchFollowCounts(profileUserId);
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
        getFollowers: getFollowersApi, // Экспортируем для UserList
        getFollowing: getFollowingApi, // Экспортируем для UserList
    };
};