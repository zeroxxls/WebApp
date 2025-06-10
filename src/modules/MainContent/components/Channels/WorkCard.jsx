import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmationModal } from "../../../../shared/ui/ConfirmationModal";

export const WorkCard = ({ work, user, onClick, isOwnProfile, onDelete }) => { // <--- Добавляем isOwnProfile и onDelete в пропсы
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // <--- Состояние для модального окна подтверждения

  let imageUrl = 'URL_ЗАГЛУШКИ';

  if (work.files && Array.isArray(work.files) && work.files.length > 0 && work.files[0]?.url) {
    imageUrl = work.files[0].url;
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(); 
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow bg-gray-100"
    >
      <img
        src={imageUrl}
        alt={work.title || 'Work'}
        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition duration-300 z-10" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-4 space-y-1 bg-gradient-to-t from-black/50 to-transparent">
        <h3 className="text-white text-lg font-semibold transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {work.title}
        </h3>
        <div className="flex items-center space-x-2 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-50">
          {user && (
            <img
              src={`http://localhost:4444/avatars/${user._id}/avatar?${Date.now()}`}
              alt={user.fullName || user.name || 'User'}
              className="w-6 h-6 rounded-full object-cover cursor-pointer"
            />
          )}
          <span className="text-white text-sm">{user?.fullName || user?.name || 'User'}</span>
        </div>
      </div>

      {/* Корзина для удаления, видна только для владельца профиля при наведении */}
      {isOwnProfile && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        >
          <RiDeleteBin6Line />
        </button>
      )}

      {/* Модальное окно подтверждения удаления */}
      {showDeleteConfirm && (
        <ConfirmationModal
          message="Вы уверены, что хотите удалить эту работу?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};