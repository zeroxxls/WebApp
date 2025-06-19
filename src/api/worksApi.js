export const fetchUserWorks = async (userId) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/works/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data.works;
};

export const uploadWork = async (formData) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/works/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return await response.json();
};