export const checkMutualFollowApi = async (targetUserId, currentUserId) => {
  const res = await fetch(`http://localhost:4444/users/${targetUserId}/following`);
  if (!res.ok) throw new Error('Failed to check mutual follow');
  const data = await res.json();
  return data.following.some(user => user._id === currentUserId);
};
