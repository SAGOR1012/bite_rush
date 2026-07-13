import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import carousel_img1 from '../../assets/food_carousal1.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: 'Fresh & Delicious Meals',
    subtitle: 'Order your favorite food in minutes',
    button: 'Order Now',
    image: 'https://i.ibb.co.com/fYp0JzTJ/food-carousal1.jpg',
  },
  {
    id: 2,
    title: 'Hot Pizza Collection',
    subtitle: 'Cheesy, crispy and freshly baked',
    button: 'Explore Menu',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
  },
  {
    id: 3,
    title: 'Fast Delivery',
    subtitle: 'Delivered fresh to your doorstep',
    button: 'Get Started',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200',
  },
];

const FoodCarousel = () => {
  return (
    <section className='w-full '>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={1000}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        className='rounded-sm overflow-hidden shadow-2xl '>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className='relative h-[300px] md:h-[500px]'>
              <img
                src={slide.image}
                alt={slide.title}
                className='w-full h-full object-cover'
              />

              <div className='absolute inset-0 bg-black/55 flex items-center'>
                <div className='max-w-xl px-8 md:px-16 text-white'>
                  <span className='bg-orange-500 px-4 py-1 rounded-full text-sm font-medium'>
                    BiteRush
                  </span>

                  <h1 className='text-4xl md:text-6xl font-bold mt-5 leading-tight'>
                    {slide.title}
                  </h1>

                  <p className='mt-4 text-lg text-gray-200'>{slide.subtitle}</p>

                  <button className='mt-8 px-7 py-3 rounded-xl bg-orange-500 font-semibold transition hover:bg-orange-600'>
                    {slide.button}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FoodCarousel;
