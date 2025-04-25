import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CustomSwiperBtn } from '../../../shared/ui/CustomSwiperBtn';

const news = [
    {
      title: 'Новая 3D-работа от художника X',
      description: 'Фантастический концепт-флот в Sci-Fi сеттинге',
      image: 'https://magazine.artstation.com/wp-content/uploads/2025/04/B_1280x400.png',
    },
    {
      title: 'Обновление портфолио',
      description: 'Добавлены 5 новых скульптур',
      image: 'https://magazine.artstation.com/wp-content/uploads/2024/12/AW2_artstation_DLC_article_1280x400.png',
    },
    {
      title: 'Процесс создания монстра',
      description: 'Подробный breakdown персонажа',
      image: 'https://magazine.artstation.com/wp-content/uploads/2025/04/SOM_1280x400.jpg',
    },
    {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdnb.artstation.com/p/assets/images/images/087/285/463/large/kasimir-v-robo-4-4-p5.jpg?1745397828',
      },
      {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/087/228/154/4k/bugra-erke-tarkan-8.jpg?1745255791',
      },
      {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/087/127/382/large/gabriel-tan-assassins-creed-shadows-omi-mt-hiei-concept-art-gabriel-tan.jpg?1744959349',
      },
      {
        title: 'Процесс создания монстра',
        description: 'Подробный breakdown персонажа',
        image: 'https://cdna.artstation.com/p/assets/images/images/086/718/070/4k/frederic-daoust-fullbody.jpg?1743891261',
      },
  ];

  export const NewsSlider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
  
    return (
      <div className="relative m-5">
        {/* Кастомные кнопки со ссылками */}
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
          {news.map((item, index) => (
            <SwiperSlide key={index} className="!w-[500px]">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition duration-300 z-10"></div>
                <div className="relative z-20 p-5 h-full flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-white text-3xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg font-semibold">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
