import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const LikedWorksHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-4">
      <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300 transition duration-300">
        <ArrowLeftIcon className="h-6 w-6" />
      </button>
      <h2 className="text-2xl mx-5 mt-5 font-semibold mb-4">Your Liked Works</h2>
    </div>
  );
};
