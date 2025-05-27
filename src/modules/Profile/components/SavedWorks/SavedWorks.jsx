import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WorkCard } from '../../../MainContent/components/Channels/WorkCard';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../shared/ui/Loader';

export const SavedWorks = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id);
  const [savedWorks, setSavedWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedWorks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4444/users/${userId}/saved`, {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (!savedWorks.length) {
    return (
      <div className="container mx-auto mt-8 text-center text-gray-500">
        You haven't saved any works yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {savedWorks.map((work) => (
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