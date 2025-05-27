import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WorkCard } from '../../../MainContent/components/Channels/WorkCard';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../shared/ui/Loader';

export const LikedWorks = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id);
  const [likedWorks, setLikedWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedWorks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4444/users/${userId}/liked`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch liked works');
        }

        const data = await response.json();
        setLikedWorks(data.likedWorks || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLikedWorks();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (!likedWorks.length) {
    return (
      <div className="container mx-auto mt-8 text-center text-gray-500">
        You haven't liked any works yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {likedWorks.map((work) => (
        <WorkCard
          key={work._id}
          work={work}
          user={work.author}  
          onClick={() => navigate(`/work/${work._id}`)}
        />
      ))}
    </div>
  );
};

