import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../shared/utils/dateUtils';

export const NewsGridSection = ({ articles }) => {
    const navigate = useNavigate();
    
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const extractImageKey = (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.pathname.substring(1); 
      } catch {
        return url;
      }
    };

    const handleArticleClick = (id) => {
        navigate(`/article/${id}`);
    };

    if (!articles || !Array.isArray(articles) || articles.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-400">No articles found</p>
            </div>
        );
    }

    return (
        <div className="py-10 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {articles.map((article) => {
                  const imageKey = extractImageKey(article.previewImage);
                  return (
                    <div
                        key={article._id}
                        className="group bg-gray-800 rounded overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={`${API_BASE_URL}/articles/image/${encodeURIComponent(imageKey)}`}
                            alt={article.title}
                            className="w-full h-56 object-cover cursor-pointer"
                            onClick={() => handleArticleClick(article._id)}
                            onError={(e) => {
                              // Fallback на оригинальный URL если прокси не сработал
                              if (e.target.src !== article.previewImage) {
                                e.target.src = article.previewImage;
                              }
                            }}
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
                  );
                })}
            </div>
        </div>
    );
};