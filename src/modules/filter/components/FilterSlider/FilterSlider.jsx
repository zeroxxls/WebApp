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
  { title: 'Comic Art', image: 'https://cdna.artstation.com/p/channels/icon_image/000/000/078/20221213135211/thumb/thumb.jpg?1670961131' },
  { title: 'Illustration', image: 'https://cdna.artstation.com/p/channels/covers/000/000/088/20200505144412/thumb/thumb.jpg?1588707852' },
  { title: 'Stylized', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/119/20200505155012/thumb/thumb.jpg?1588711812' },
  { title: 'Architectural Visualization', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/073/20200505111414/thumb/thumb.jpg?1588695254' },
  { title: 'Mecha', image: 'https://cdna.artstation.com/p/channels/covers/000/000/092/20200505145646/thumb/thumb.jpg?1588708606' },
  { title: 'Charachter Design', image: 'https://cdna.artstation.com/p/channels/covers/000/000/074/20200505132748/thumb/thumb.jpg?1588703268' },
  { title: 'Charachter Modeling', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/075/20200505133346/thumb/thumb.jpg?1588703626' },
  { title: 'Comic Art', image: 'https://cdna.artstation.com/p/channels/icon_image/000/000/078/20221213135211/thumb/thumb.jpg?1670961131' },
  { title: 'Illustration', image: 'https://cdna.artstation.com/p/channels/covers/000/000/088/20200505144412/thumb/thumb.jpg?1588707852' },
  { title: 'Stylized', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/119/20200505155012/thumb/thumb.jpg?1588711812' },
  { title: 'Architectural Visualization', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/073/20200505111414/thumb/thumb.jpg?1588695254' },
  { title: 'Mecha', image: 'https://cdna.artstation.com/p/channels/covers/000/000/092/20200505145646/thumb/thumb.jpg?1588708606' },
  { title: 'Charachter Design', image: 'https://cdna.artstation.com/p/channels/covers/000/000/074/20200505132748/thumb/thumb.jpg?1588703268' },
  { title: 'Charachter Modeling', image: 'https://cdnb.artstation.com/p/channels/covers/000/000/075/20200505133346/thumb/thumb.jpg?1588703626' },
  { title: 'Comic Art', image: 'https://cdna.artstation.com/p/channels/icon_image/000/000/078/20221213135211/thumb/thumb.jpg?1670961131' },
  { title: 'Illustration', image: 'https://cdna.artstation.com/p/channels/covers/000/000/088/20200505144412/thumb/thumb.jpg?1588707852' },
];

export const FilterSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Кастомные кнопки */}
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
        loop
        className="newsSwiper"
      >
        {filters.map((item, index) => (
          <SwiperSlide key={index} className="!w-[150px]">
          <div className="flex items-center gap-3 h-14 rounded-xl shadow-md cursor-pointer overflow-hidden">
            <div
              className="w-20 h-14 flex-shrink-0 bg-center bg-cover bg-no-repeat rounded-xl transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <h3 className="text-gray-200 text-sm font-medium pr-3 line-clamp-2">{item.title}</h3>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
