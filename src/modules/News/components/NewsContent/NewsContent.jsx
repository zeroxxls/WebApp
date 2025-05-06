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
    <div>
      <div>
        <img src={article.NewsPrevImage} alt="preview" style={{ width: '100%' }} />
        <h1>{article.title}</h1>
        <h3>{article.description}</h3>
      </div>
      <div style={{ whiteSpace: 'pre-line', margin: '1rem 0' }}>
        {article.articleDescription}
      </div>
      <div>
        {Array.isArray(article.articleImages) && article.articleImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`article-${i}`}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        ))}
      </div>
    </div>
  );
};
