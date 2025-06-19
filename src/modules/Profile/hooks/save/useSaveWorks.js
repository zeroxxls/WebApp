import { useEffect, useState } from 'react';

export const useSavedWorks = (userId) => {
  const [savedWorks, setSavedWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedWorks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/saved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch saved works');
        }

        const data = await response.json();
        setSavedWorks(data.savedWorks || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSavedWorks();
    }
  }, [userId]);

  return { savedWorks, loading };
};
