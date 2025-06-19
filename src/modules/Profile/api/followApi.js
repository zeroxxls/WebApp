const BASE_URL = import.meta.env.VITE_BACKEND_URL + '/users';

export const followUserApi = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/${userId}/follow`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to follow user');
  return res.json();
};

export const unfollowUserApi = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/${userId}/unfollow`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to unfollow user');
  return res.json();
};

export const getFollowersApi = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}/followers`);
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to get followers');
  return res.json();
};

export const getFollowingApi = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}/following`);
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to get following');
  return res.json();
};

export const fetchFollowCountsApi = async (userId) => {
  const [followersRes, followingRes] = await Promise.all([
    fetch(`${BASE_URL}/${userId}/followers?limit=1`),
    fetch(`${BASE_URL}/${userId}/following?limit=1`),
  ]);

  if (!followersRes.ok || !followingRes.ok) {
    throw new Error('Failed to fetch follow counts');
  }

  const followersData = await followersRes.json();
  const followingData = await followingRes.json();

  return {
    followers: followersData.total,
    following: followingData.total,
  };
};

export const checkMutualFollowApi = async (targetUserId, currentUserId) => {
  const res = await fetch(`${BASE_URL}/${targetUserId}/following`);
  if (!res.ok) throw new Error('Failed to check mutual follow');
  const data = await res.json();
  return data.following.some(user => user._id === currentUserId);
};
