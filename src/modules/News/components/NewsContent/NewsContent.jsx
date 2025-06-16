import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../../../api/articlesApi';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { Loader } from '../../../../shared/ui/Loader';

export const NewsContent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className='mb-10'>
      <div className='max-w-5xl mt-10 mx-auto text-center'>
        <h1 className="text-4xl font-bold mb-20 mt-20 text-white">{article.title}</h1>
        <img 
          src={article.previewImage} 
          alt="preview" 
          className='w-full max-h-[500px] object-cover object-top shadow-lg mb-6' 
        />
      </div>

      <div className="prose prose-lg px-4 sm:px-8 mx-auto max-w-5xl text-gray-200">
        <div className="whitespace-pre-line leading-relaxed">
          <h3 className="text-xl font-medium text-gray-400 mb-6">{article.description}</h3>
          <p className="text-base sm:text-lg text-gray-300 leading-8 tracking-wide">
            {article.content}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {article.images?.map((img, i) => (
            <div key={i} className='overflow-hidden shadow-md'>
              <img
                src={img}
                alt={`article-${i}`}
                className='w-full h-auto object-cover transition-opacity duration-300 hover:opacity-95'
                loading={i > 0 ? "lazy" : "eager"}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Published by <span className="text-blue-400">{article.author?.fullName || 'Unknown'}</span> • {formatDate(article.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};