import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../shared/ui/Loader';
import { handleProfileClick } from '../../../../shared/utils/navigation';

export const UserList = ({ title, fetchUsers, onClose }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUsers();
        setUsers(response.data); 
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  const handleUserClick = (userId) => {
    handleProfileClick(navigate, userId);
    if (onClose) onClose();
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-xl border border-gray-700 mx-auto">
  <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-3">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    {onClose && (
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="medium" />
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-200 hover:text-white underline"
          >
            Try again
          </button>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="mt-2 text-gray-400">No users found</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"> 
          {users.map(user => (
            <div 
              key={user._id}
              className="flex items-center gap-4 p-3 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer group"
              onClick={() => handleUserClick(user._id || user.id)}
            >
              <div className="relative flex-shrink-0">
                {user.avatar ? (
                  <img 
                   src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${user._id}/avatar?${Date.now()}`}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-500 transition-colors"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2QxZDVmMSI+PHBhdGggZD0iTTEyIDQuMzU0YTQgNCAwIDExMCA1LjI5Mk0xNSAyMUgzdi0xYTYgNiAwIDExMTIgMHYxem0wIDBoNnYtMWE2IDYgMCAwMC05LTUuMTk3TTEzIDdhNCA0IDAgMTEtOCAwIDQgNCAwIDAxOCAweiIvPjwvc3ZnPg==';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 group-hover:border-blue-500 transition-colors">
                    <span className="text-xl font-medium text-gray-300">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{user.fullName}</p>
                {user.username && (
                  <p className="text-gray-400 text-sm truncate">@{user.username}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};