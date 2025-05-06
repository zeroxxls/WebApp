import React from 'react';
import { useParams } from 'react-router-dom';
import { news } from '../../data/news';

export const NewsContent = () => {
  const { id } = useParams();
  const article = news.find(item => item.id === Number(id));

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
<div className='mb-10'>
  <div className='max-w-5xl mt-10 mx-auto text-center'>
    <h1 className="text-4xl font-bold mb-20 mt-20 text-white">{article.title}</h1>
    <img 
      src={article.NewsPrevImage} 
      alt="preview" 
      style={{ width: '100%' }} 
      className='w-full max-h-130 object-cover object-top shadow-lg mb-6' 
    />
  </div>

  {/* Центрируем контент статьи */}
  <div className="prose prose-lg px-4 sm:px-8 mx-auto max-w-5xl text-gray-200">
    <div className="whitespace-pre-line leading-relaxed">
      <h3 className="text-xl font-medium text-gray-400 mb-6">{article.description}</h3>
      <p className="text-base sm:text-lg text-gray-300 leading-8 tracking-wide">
        {article.articleDescription}
      </p>
    </div>

    {/* Галерея изображений */}
    <div className="mt-10 space-y-8">
      {Array.isArray(article.articleImages) && article.articleImages.map((img, i) => (
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
  </div>
</div>
  );
};
