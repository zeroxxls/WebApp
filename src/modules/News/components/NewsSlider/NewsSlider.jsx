import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { news } from '../../data/news';
import { CustomSwiperBtn } from '../../../../shared/ui/CustomSwiperBtn';

  export const NewsSlider = () => {
    const navigate = useNavigate()
    const handleArticleClick = (id)=>{
      navigate(`/article/${id}`);
    }
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
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group" onClick={()=> handleArticleClick(item.id)}>
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.NewsPrevImage})` }}
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
