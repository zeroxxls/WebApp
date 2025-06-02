import React, { useState, useEffect } from 'react';
import { Loader } from '../../../../shared/ui/Loader';

export const UserList = ({ title, fetchUsers }) => {
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

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No users found</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {users.map(user => (
            <div key={user._id} className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={`data:${user.avatar.contentType};base64,${user.avatar.data.toString('base64')}`} 
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-white font-medium">{user.fullName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};