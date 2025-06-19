import { useState, useEffect } from 'react';

export const useLikedWorks = (userId) => {
  const [likedWorks, setLikedWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedWorks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/liked`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch liked works');

        const data = await response.json();
        setLikedWorks(data.likedWorks || []);
      } catch (error) {
        console.error('Error fetching liked works:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchLikedWorks();
  }, [userId]);

  return { likedWorks, loading };
};
