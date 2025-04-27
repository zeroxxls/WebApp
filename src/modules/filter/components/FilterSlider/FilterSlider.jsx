import React, { useRef,} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CustomSwiperBtn } from '../../../../shared/ui/CustomSwiperBtn';

const filters = [
  { title: 'Stylized', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/119/20200505155012/thumb/thumb.jpg?1588711812' },
  { title: 'Architectural Visualization', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/073/20200505111414/thumb/thumb.jpg?1588695254' },
  { title: 'Mecha', image: 'https://cdna.artstation.com/p/channels/covers/000/000/092/20200505145646/thumb/thumb.jpg?1588708606' },
  { title: 'Charachter Design', image: 'https://cdna.artstation.com/p/channels/covers/000/000/074/20200505132748/thumb/thumb.jpg?1588703268' },
  { title: 'Charachter Modeling', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/075/20200505133346/thumb/thumb.jpg?1588703626' },
  { title: 'Illustration', image: 'https://cdna.artstation.com/p/channels/covers/000/000/088/20200505144412/thumb/thumb.jpg?1588707852' },
  { title: 'Stylized', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/119/20200505155012/thumb/thumb.jpg?1588711812' },
  { title: 'Architectural Visualization', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/073/20200505111414/thumb/thumb.jpg?1588695254' },
  { title: 'Mecha', image: 'https://cdna.artstation.com/p/channels/covers/000/000/092/20200505145646/thumb/thumb.jpg?1588708606' },
  { title: 'Charachter Design', image: 'https://cdna.artstation.com/p/channels/covers/000/000/074/20200505132748/thumb/thumb.jpg?1588703268' },
  { title: 'Charachter Modeling', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/075/20200505133346/thumb/thumb.jpg?1588703626' },
  { title: 'Illustration', image: 'https://cdna.artstation.com/p/channels/covers/000/000/088/20200505144412/thumb/thumb.jpg?1588707852' },
  { title: 'Stylized', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/119/20200505155012/thumb/thumb.jpg?1588711812' },
  { title: 'Architectural Visualization', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/073/20200505111414/thumb/thumb.jpg?1588695254' },
  { title: 'Mecha', image: 'https://cdna.artstation.com/p/channels/covers/000/000/092/20200505145646/thumb/thumb.jpg?1588708606' },
  { title: 'Charachter Design', image: 'https://cdna.artstation.com/p/channels/covers/000/000/074/20200505132748/thumb/thumb.jpg?1588703268' },
  { title: 'Charachter Modeling', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/075/20200505133346/thumb/thumb.jpg?1588703626' },
  { title: 'Illustration', image: 'https://cdna.artstation.com/p/channels/covers/000/000/088/20200505144412/thumb/thumb.jpg?1588707852' },
];

export const FilterSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
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
       spaceBetween={20}  // Уменьшил расстояние между слайдами
       slidesPerView={10}  // Фиксированное количество видимых слайдов
       loop
       className="newsSwiper"
      >
        {filters.map((item, index) => (
            <SwiperSlide key={index} className="!w-[230px]">
            <div className="group relative flex items-center gap-4 w-full h-20 rounded-xl bg-gray-800/60 cursor-pointer overflow-hidden border border-gray-700 hover:border-indigo-400/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent z-10"></div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              {/* Image */}
              <div
                className="w-16 h-16 ml-3 flex-shrink-0 bg-center bg-cover bg-no-repeat rounded-xl z-20 border border-gray-600/50 group-hover:border-indigo-400/30 transition-all duration-300"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Text */}
              <h3 className="text-white text-base font-semibold pr-4 line-clamp-2 z-20 relative">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                  {item.title}
                </span>
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
