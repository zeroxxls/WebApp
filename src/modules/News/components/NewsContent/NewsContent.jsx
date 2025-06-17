import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../../../api/articlesApi';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { Loader } from '../../../../shared/ui/Loader';
import {Footer} from '../../../Footer'

export const NewsContent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:4444' 
    : 'https://your-production-api.com';

  const extractImageKey = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.substring(1);
    } catch {
      return url;
    }
  };

  const getProxiedImageUrl = (originalUrl) => {
    const imageKey = extractImageKey(originalUrl);
    return `${API_BASE_URL}/articles/image/${encodeURIComponent(imageKey)}`;
  };

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticle();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div>
      <div className='max-w-5xl mt-10 mx-auto text-center'>
        <h1 className="text-4xl font-bold mb-20 mt-20 text-white">{article.title}</h1>
        <img 
          src={getProxiedImageUrl(article.previewImage)}
          alt={article.title}
          className='w-full max-h-[500px] object-cover object-top shadow-lg mb-6 rounded-t-2xl'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = article.previewImage;
          }}
        />
      </div>

      <div className="prose prose-lg px-4 sm:px-8 mx-auto mb-10 max-w-5xl text-gray-200">
        <div className="whitespace-pre-line leading-relaxed">
          <h3 className="text-xl font-medium text-gray-400 mb-6">{article.description}</h3>
          <p className="text-base sm:text-lg text-gray-300 leading-8 tracking-wide">
            {article.content}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {article.images?.map((img, i) => {
            const imageUrl = getProxiedImageUrl(img);
            return (
              <div key={i} className='overflow-hidden shadow-md'>
                <img
                  src={imageUrl}
                  alt={`article-${i}`}
                  className='w-full h-auto object-cover transition-opacity duration-300 hover:opacity-95'
                  loading={i > 0 ? "lazy" : "eager"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = img;
                  }}
                />
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Published by <span className="text-blue-400">{article.author?.fullName || 'Unknown'}</span> • {formatDate(article.createdAt)}
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};