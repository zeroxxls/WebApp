export const fetchUserWorks = async (userId) => {
  const response = await fetch(`http://localhost:4444/works/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await response.json();
};