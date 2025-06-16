import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../shared/utils/dateUtils';

export const NewsGridSection = ({ articles }) => {
    const navigate = useNavigate();

    const handleArticleClick = (id) => {
        navigate(`/article/${id}`);
    };

    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-400">No articles found</p>
            </div>
        );
    }

    if (!Array.isArray(articles)) {
  return (
    <div className="text-center py-10">
      <p className="text-gray-400">Articles data is not available</p>
    </div>
  );
}

if (articles.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-400">No articles found</p>
            </div>
        );
    }

    return (
        <div className="py-10 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {articles.map((article) => (
                    <div
                        key={article._id}
                        className="group bg-gray-800 rounded overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                    >
                        <img
                            src='`${API_BASE_URL}/articles/image-proxy?url=${encodeURIComponent(article.previewImage)}`'
                            alt={article.title}
                            className="w-full h-56 object-cover cursor-pointer"
                            onClick={() => handleArticleClick(article._id)}
                        />
                        <div className="p-5">
                            <h2 className="text-white text-lg font-semibold leading-snug">
                                {article.title}
                            </h2>
                            <p className="text-sm text-gray-400 mt-3">
                                By <span className="text-blue-400">{article.author?.fullName || 'Unknown'}</span> • {formatDate(article.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};