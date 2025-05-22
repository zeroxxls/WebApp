export const fetchUserWorks = async (userId) => {
  const response = await fetch(`http://localhost:4444/works/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data.works;
};

export const uploadWork = async (formData) => {
  const response = await fetch('http://localhost:4444/works/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return await response.json();
};