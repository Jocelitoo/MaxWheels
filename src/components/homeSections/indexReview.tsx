import review1 from '../../assets/images/pic-1.jpg';
import review2 from '../../assets/images/pic-2.jpg';
import review3 from '../../assets/images/pic-3.jpg';
import { h2Css } from '../../styles/h2-css.tsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';

export function Review() {
  const [width, setWidth] = useState(window.innerWidth);
  const [slideChanged, setSlideChanged] = useState(0);
  const swiper = useRef<SwiperRef>(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (swiper.current?.children) {
      const swiperChildList = swiper.current?.children as HTMLCollection;
      const swiperWrapper = swiperChildList[0] as HTMLDivElement;
      const paginationButtonsList = swiperChildList[1].childNodes as NodeList;

      swiperWrapper.classList.add('pb-8');

      paginationButtonsList.forEach((item) => {
        const span = item as HTMLSpanElement;

        if (span.classList.contains('swiper-pagination-bullet-active')) {
          span.classList.add(
            ...['!bg-mainColor', 'scale-150', 'transform', 'duration-500'],
          );
        } else {
          span.classList.remove(...['!bg-mainColor', 'scale-150']);
        }
      });
    }
  }, [slideChanged, width]);

  const listaReviews = [
    {
      img: review1,
      nome: 'John',
      alt: 'Homem sorrindo',
    },
    {
      img: review2,
      nome: 'Laure',
      alt: 'Mulher sorrindo',
    },
    {
      img: review3,
      nome: 'Jack',
      alt: 'Homem serio',
    },
  ];

  return (
    <section id="reviews" className="p-interface py-4 bg-light-10%">
      <h2 className={`${h2Css} `}>
        <span className="relative">
          Opinião
          <span className="after:inline-block after:bg-mainColor after:w-full after:h-1 after:absolute after:left-0 after:bottom-0"></span>
        </span>{' '}
        dos clientes
      </h2>

      {width >= 1024 ? (
        <div className="flex gap-4">
          {listaReviews.map((item) => {
            return (
              <div
                key={item.img}
                className="!flex flex-col items-center gap-4 text-center p-4 bg-light mt-4 rounded"
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  width={193}
                  height={190}
                  loading="lazy"
                  className=" min-w-28 w-1/3 rounded-full"
                />
                <p className="opacity-70">
                  Mussum Ipsum, cacilds vidis litro abertis. Interessantiss
                  quisso pudia ce receita de bolis, mais bolis eu num
                  gostis.Quem manda na minha terra sou euzis!Interagi no mé,
                  cursus quis, vehicula ac nisi.Atirei o pau no gatis, per gatis
                  num morreus.
                </p>
                <p className="font-bold text-2xl">{item.nome}</p>
                <div className="flex">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"></path>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Swiper
          slidesPerView={width >= 640 ? 2 : 1}
          spaceBetween={16}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          ref={swiper}
          onSlideNextTransitionStart={() => setSlideChanged(slideChanged + 1)}
          onSlidePrevTransitionStart={() => setSlideChanged(slideChanged + 1)}
        >
          {listaReviews.map((item) => {
            return (
              <SwiperSlide
                key={item.img}
                className="!flex flex-col items-center gap-4 text-center p-4 bg-light mt-4 rounded"
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  width={193}
                  height={190}
                  loading="lazy"
                  className=" min-w-28 w-1/3 rounded-full"
                />
                <p className="opacity-70">
                  Mussum Ipsum, cacilds vidis litro abertis. Interessantiss
                  quisso pudia ce receita de bolis, mais bolis eu num
                  gostis.Quem manda na minha terra sou euzis!Interagi no mé,
                  cursus quis, vehicula ac nisi.Atirei o pau no gatis, per gatis
                  num morreus.
                </p>
                <p className="font-bold text-2xl">{item.nome}</p>
                <div className="flex">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>

                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    className="fill-yellow-500 text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"></path>
                  </svg>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}
