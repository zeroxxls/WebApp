// hooks/useModal.js
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLikedWorks, setSavedWorks } from '../../../store/slices/userSlice';
import { useCart } from '../../Cart/hooks/useCart';

export const useModal = (selectedWorkId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems, addToCart } = useCart();
  const userId = useSelector((state) => state.auth.user?._id);
  const likedWorks = useSelector((state) => state.user.likedWorks || []);
  const savedWorks = useSelector((state) => state.user.savedWorks || []);
  const selectedWork = useSelector((state) =>
    state.works.userWorks.find(work => work._id === selectedWorkId)
  );

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLikingRequest, setIsLikingRequest] = useState(false);
  const [isSavingRequest, setIsSavingRequest] = useState(false);

  const isLiked = likedWorks.includes(selectedWorkId);
  const isSaved = savedWorks.includes(selectedWorkId);
    const isInCart = cartItems.some(item => item.workId === selectedWorkId);


  const handleAddToCart = async () => {
    if (!selectedWork) return;

    // Проверка: является ли автор работы текущим пользователем
    if (selectedWork.author?._id === userId) {
      alert("You cannot add your own work to the cart.");
      return;
    }

    setIsAddingToCart(true);
    try {
      addToCart({
        workId: selectedWork._id,
        title: selectedWork.title,
        author: selectedWork.author?.fullName || 'Unknown',
        price: selectedWork.price,
        image: selectedWork.files?.[0]?.url || 'https://via.placeholder.com/150',
        authorId: selectedWork.author?._id,
      });

      // Можно добавить API вызов для сохранения корзины на сервере
      // await axios.post(`/api/users/${userId}/cart`, { workId: selectedWork._id });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const updateLike = async () => {
    if (!userId || !selectedWorkId || isLikingRequest) return;

    setIsLikingRequest(true);
    const action = isLiked ? 'unlike' : 'like';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/users/${userId}/${action}/${selectedWorkId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setLikedWorks(response.data.likedWorks));
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsLikingRequest(false);
    }
  };

  const updateSave = async () => {
    if (!userId || !selectedWorkId || isSavingRequest) return;

    setIsSavingRequest(true);
    const action = isSaved ? 'unsave' : 'save';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/users/${userId}/${action}/${selectedWorkId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setSavedWorks(response.data.savedWorks));
    } catch (error) {
      console.error('Error updating save:', error);
    } finally {
      setIsSavingRequest(false);
    }
  };

  return {
    isLiked: likedWorks.includes(selectedWorkId),
    isSaved: savedWorks.includes(selectedWorkId),
    isAddingToCart: isAddingToCart || isInCart,
    handleLike: updateLike,
    handleSave: updateSave,
    handleAddToCart,
    handleProfileClick: (onClose, userId) => {
      onClose();
      navigate(`/profile/${userId}`);
    },
    isLikingRequest,
    isSavingRequest
  };
};