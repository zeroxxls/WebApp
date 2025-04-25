import React, { useRef,} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CustomSwiperBtn } from '../../../shared/ui/CustomSwiperBtn';

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
            <div className="group relative flex items-center gap-4 w-full h-20 rounded-2xl shadow-lg bg-transparent cursor-pointer overflow-hidden">
              
              {/* Затемнение при наведении */}
              <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10" />
          
              {/* Картинка */}
              <div
                className="w-20 h-15 ml-3 flex-shrink-0 bg-center bg-cover bg-no-repeat rounded-xl z-20"
                style={{ backgroundImage: `url(${item.image})` }}
              />
          
              {/* Текст */}
              <h3 className="text-white text-base font-semibold pr-4 line-clamp-2 z-20">
                {item.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
