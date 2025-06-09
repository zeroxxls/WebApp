import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
            
            // Проверка взаимной подписки
            if (following) {
                checkMutualFollow();
            }
            
            fetchFollowCounts(profileUserId);
        }
    }, [currentUser, profileUserId]);

    const checkMutualFollow = async () => {
        try {
            const response = await fetch(`http://localhost:4444/users/${profileUserId}/following`);
            if (!response.ok) throw new Error('Failed to check mutual follow');
            const data = await response.json();
            const isMutual = data.following.some(user => user._id === currentUser._id);
            setIsMutualFollow(isMutual);
        } catch (error) {
            console.error("Error checking mutual follow:", error);
        }
    };

    const fetchFollowCounts = async (userId) => {
        try {
            const [followersRes, followingRes] = await Promise.all([
                fetch(`http://localhost:4444/users/${userId}/followers?limit=1`),
                fetch(`http://localhost:4444/users/${userId}/following?limit=1`)
            ]);
            
            if (!followersRes.ok || !followingRes.ok) {
                throw new Error('Failed to fetch follow counts');
            }
            
            const followersData = await followersRes.json();
            const followingData = await followingRes.json();
            
            setFollowersCount(followersData.total);
            setFollowingCount(followingData.total);
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
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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
            setIsMutualFollow(false);
            setFollowersCount(prev => Math.max(0, prev - 1)); // Защита от отрицательных значений
        } else {
            response = await followUserApi(profileUserId);
            setIsFollowing(true);
            await checkMutualFollow();
            setFollowersCount(prev => prev + 1);
        }
        
        // Обновляем общее количество после действия
        await fetchFollowCounts(profileUserId);
    } catch (error) {
        console.error('Error toggling follow:', error);
        // Можно добавить уведомление об ошибке
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
        getFollowers: getFollowersApi, // Экспортируем для UserList
        getFollowing: getFollowingApi, // Экспортируем для UserList
    };
};