import React, { useRef, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SLIDER_FILTERS } from '../../constant/filters.js';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CustomSwiperBtn } from '../../../../shared/ui/CustomSwiperBtn';

export const FilterSlider = () => {
  const { activeFilter, setActiveFilter } = useFilters();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      // Re-init navigation
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="relative w-full">
      <CustomSwiperBtn prevRef={prevRef} nextRef={nextRef} />

      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={20}
        slidesPerView={10}
        loop
        className="newsSwiper"
      >
        {SLIDER_FILTERS.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[230px]"
            onClick={() => {setActiveFilter(activeFilter === item.id ? null : item.id)}}
          >
            <div className={`group relative flex items-center gap-4 w-full h-20 rounded-xl bg-gray-800/60 cursor-pointer overflow-hidden border border-gray-700 hover:border-indigo-400/50${
              activeFilter === item.id
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-400'
                : 'bg-gray-800/80 text-white border-gray-700 hover:bg-gray-700/90 hover:border-indigo-400'
            }  transition-all duration-300 shadow-lg hover:shadow-indigo-500/20`} >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div
                className="w-16 h-16 ml-3 flex-shrink-0 bg-center bg-cover bg-no-repeat rounded-xl z-20 border border-gray-600/50 group-hover:border-indigo-400/30 transition-all duration-300"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <h3 className="text-white text-base font-semibold pr-4 line-clamp-2 z-20 relative">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                  {item.label}
                </span>
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
