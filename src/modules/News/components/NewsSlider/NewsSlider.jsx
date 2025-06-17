import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchAllArticles } from '../../../../api/articlesApi';
import { CustomSwiperBtn } from '../../../../shared/ui/CustomSwiperBtn';
import { Loader } from '../../../../shared/ui/Loader';

export const NewsSlider = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [articles, setArticles] = useState([]);
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
    const loadArticles = async () => {
      try {
        const data = await fetchAllArticles();
        
        if (!Array.isArray(data)) {
          throw new Error(`API returned non-array data: ${JSON.stringify(data)}`);
        }
        
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setArticles(shuffled.slice(0, 5));
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (articles.length === 0) return <div className="text-gray-400 p-4">No articles available</div>;

  return (
    <div className="relative m-5">
      <CustomSwiperBtn prevRef={prevRef} nextRef={nextRef} />

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={16}
        slidesPerView="auto"
        className="newsSwiper"
      >
        {articles.map((article) => {
          const proxiedImageUrl = getProxiedImageUrl(article.previewImage);
          
          return (
            <SwiperSlide key={article._id} className="!w-[500px]">
              <div 
                className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group" 
                onClick={() => navigate(`/article/${article._id}`)}
              >
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${proxiedImageUrl})`,
                    backgroundSize: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.backgroundImage = `url(${article.previewImage})`;
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition duration-300 z-10"></div>
                <div className="relative z-20 p-5 h-full flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-white text-3xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-400 text-lg font-semibold">{article.description}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};