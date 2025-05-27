import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WorkCard } from '../../../MainContent/index';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../shared/ui/Loader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ModalWindow } from '../../../MainContent/index';

export const SavedWorks = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id);
  const [savedWorks, setSavedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleGoBack = () => {
    navigate(-1);
  };

    const openWorkModal = (work, user) => {
    setSelectedWork(work);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const closeWorkModal = () => {
    setOpenModal(false);
    setSelectedWork(null);
    setSelectedUser(null);
  };

  if (loading) {
    return (
          <Loader />
    );
  }

  if (!savedWorks.length) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center p-4">
          <button onClick={handleGoBack} className="text-white hover:text-gray-300 transition duration-300">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h2 className="text-2xl mx-5 mt-5 font-semibold mb-4">Your Saved Works</h2>
        </div>
        <div className="container mx-auto mt-8 text-center text-gray-500 flex-grow">
          You haven't saved any works yet.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={handleGoBack} className="text-white hover:text-gray-300 transition duration-300">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl mx-5 mt-5 font-semibold mb-4">Your Saved Works</h2>
      </div>
      <div className="container mx-5 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 flex-grow">
        {savedWorks.map((work) => (
          <WorkCard
            key={work._id}
            work={work}
            user={work.author}
            onClick={() => openWorkModal(work, work.author)}
          />
        ))}
      </div>
      {openModal && selectedWork && (
        <ModalWindow
          onClose={closeWorkModal}
          selectedWork={selectedWork}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};