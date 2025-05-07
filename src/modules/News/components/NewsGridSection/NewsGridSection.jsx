import React from 'react';
import { useNavigate } from 'react-router-dom';
import { news } from '../../data/news';

export const NewsGridSection = () => {
    const navigate = useNavigate()
    const handleArticleClick = (id)=>{
        navigate(`/article/${id}`);
      }
  return (
    <div className="py-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {news.map((item, index) => (
          <div
            key={index}
            className="group bg-gray-800 rounded-md overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={item.NewsPrevImage}
              alt={item.title}
              className="w-full h-56 object-cover cursor-pointer"
              onClick={()=>handleArticleClick(item.id)}
            />
            <div className="p-5">

              {/* Заголовок */}
              <h2 className="text-white text-lg font-semibold leading-snug">
                {item.title}
              </h2>

              {/* Автор и дата */}
              <p className="text-sm text-gray-400 mt-3">
                By <span className="text-blue-400">{item.author}</span> – {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

