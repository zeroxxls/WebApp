import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModal = (selectedWorkId = 'unknown') => {
  const navigate = useNavigate();

  const { likeKey, saveKey, addingKey } = useMemo(() => ({
    likeKey: `work_${selectedWorkId}_liked`,
    saveKey: `work_${selectedWorkId}_saved`,
    addingKey: `work_${selectedWorkId}_adding`,
  }), [selectedWorkId]);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsAddingToCart(localStorage.getItem(addingKey) === 'true');
    setIsLiked(localStorage.getItem(likeKey) === 'true');
    setIsSaved(localStorage.getItem(saveKey) === 'true');
  }, [addingKey, likeKey, saveKey]);

  useEffect(() => {
    localStorage.setItem(likeKey, isLiked);
    localStorage.setItem(saveKey, isSaved);
  }, [isLiked, isSaved, likeKey, saveKey]);

  const handleAddToCart = () => {
    const newState = !isAddingToCart;
    setIsAddingToCart(newState);
    localStorage.setItem(addingKey, newState);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleProfileClick = (onClose, userId) => {
    onClose();
    navigate(`/profile/${userId}`);
  };

  return {
    isAddingToCart,
    isLiked,
    isSaved,
    handleAddToCart,
    handleLike,
    handleSave,
    handleProfileClick,
  };
};