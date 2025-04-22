import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const news = [
    {
      title: 'Новая 3D-работа от художника X',
      description: 'Фантастический концепт-флот в Sci-Fi сеттинге',
      image: 'https://cdna.artstation.com/p/assets/images/images/000/123/456/large/example.jpg',
    },
    {
      title: 'Обновление портфолио',
      description: 'Добавлены 5 новых скульптур',
      image: 'https://cdnb.artstation.com/p/assets/images/images/000/123/457/large/example2.jpg',
    },
    {
      title: 'Процесс создания монстра',
      description: 'Подробный breakdown персонажа',
      image: 'https://cdna.artstation.com/p/assets/images/images/000/123/458/large/example3.jpg',
    },
    {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/000/123/458/large/example3.jpg',
      },
      {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/000/123/458/large/example3.jpg',
      },
      {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/000/123/458/large/example3.jpg',
      },
      {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/000/123/458/large/example3.jpg',
      },
  ];

export const NewsSlider = () => {
    return (
        <div className="relative ">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={3}
            loop
            className="newsSwiper"
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {news.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-white text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
    

        </div>
      );
}
