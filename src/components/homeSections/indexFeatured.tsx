import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import car1 from '../../assets/images/car-1.png';
import car2 from '../../assets/images/car-2.png';
import car3 from '../../assets/images/car-3.png';
import car4 from '../../assets/images/car-4.png';
import car5 from '../../assets/images/car-5.png';
import car6 from '../../assets/images/car-6.png';
import car7 from '../../assets/images/car-7.png';
import car8 from '../../assets/images/car-8.png';
import { buttonCss } from '../../styles/button-css.tsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { arrowCss } from '../../styles/arrow-css.tsx';
import {
  CarProtocol,
  GlobalStateContext,
} from '../globalState/globalState.tsx';
import { toast } from 'react-toastify';

// Precisa ficar fora do componente FeaturedCars pq o que está dentro do componente é redefinido em cada renderização do componente, então o id de todos os itens sempre seria 1
class CartItem implements CarProtocol {
  id: number;
  private static nextId = 1;

  constructor(
    public img: string,
    public name: string,
    public price: number,
  ) {
    this.id = CartItem.nextId++;
  }
}

export function FeaturedCars() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { logged, setCartList } = context;

  const [slidesPerView, setSlidesPerView] = useState(1);
  const [slidechanged, setSlideChanged] = useState(0);
  const swiper1 = useRef<SwiperRef>(null);
  const swiper2 = useRef<SwiperRef>(null);

  // useEffect executado 1 vez quando a página for carregada e toda vez que a tela sofrer resize()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      if (window.innerWidth >= 640 && window.innerWidth < 1024)
        setSlidesPerView(2);
      if (window.innerWidth >= 1024) setSlidesPerView(3);
    };

    handleResize(); // Executa a function automaticamente quando a tela for carregada

    window.addEventListener('resize', handleResize); // Executa a function quando a tela sofrer resize

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // UseEffect executado 1 vez quando a página é carrega e toda vez que a variável slidesPerView ou slideChanged sofrer alguma alteração
  useEffect(() => {
    const swiper1ChildList = swiper1.current?.children as HTMLCollection;
    const swiper1Wrapper = swiper1ChildList[0] as HTMLDivElement;
    const arrow1Left = swiper1ChildList[1] as HTMLDivElement;
    const arrow1right = swiper1ChildList[2] as HTMLDivElement;
    const pagination1List = swiper1ChildList[3].childNodes as NodeList;

    const swiper2ChildList = swiper2.current?.children as HTMLCollection;
    const swiper2Wrapper = swiper2ChildList[0] as HTMLDivElement;
    const arrow2Left = swiper2ChildList[1] as HTMLDivElement;
    const arrow2right = swiper2ChildList[2] as HTMLDivElement;
    const pagination2List = swiper2ChildList[3].childNodes as NodeList;

    swiper1Wrapper.classList.add('pb-8'); // Afasta a pagination pra baixo
    swiper2Wrapper.classList.add('pb-8'); // Afasta a pagination pra baixo

    // CSS dos arrows
    if (slidesPerView === 3) {
      [arrow1Left, arrow1right].forEach((el) => el.classList.remove('hidden'));
      [arrow1Left, arrow1right].forEach((el) => el.classList.add(...arrowCss));

      [arrow2Left, arrow2right].forEach((el) => el.classList.remove('hidden'));
      [arrow2Left, arrow2right].forEach((el) => el.classList.add(...arrowCss));
    } else {
      [arrow1Left, arrow1right].forEach((el) =>
        el.classList.remove(...arrowCss),
      );
      [arrow1Left, arrow1right].forEach((el) => el.classList.add('hidden'));

      [arrow2Left, arrow2right].forEach((el) =>
        el.classList.remove(...arrowCss),
      );
      [arrow2Left, arrow2right].forEach((el) => el.classList.add('hidden'));
    }

    // CSS do pagination1
    pagination1List.forEach((item) => {
      const span = item as HTMLSpanElement;

      if (span.classList.contains('swiper-pagination-bullet-active')) {
        span.classList.add(
          ...['!bg-mainColor', 'scale-150', 'transform', 'duration-500'],
        );
      } else {
        span.classList.remove(...['!bg-mainColor', 'scale-150']);
      }
    });

    // CSS do pagination2
    pagination2List.forEach((item) => {
      const span = item as HTMLSpanElement;

      if (span.classList.contains('swiper-pagination-bullet-active')) {
        span.classList.add(
          ...['!bg-mainColor', 'scale-150', 'transform', 'duration-500'],
        );
      } else {
        span.classList.remove(...['!bg-mainColor', 'scale-150']);
      }
    });
  }, [slidechanged, slidesPerView]);

  const addItemToShoppingCart = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (logged) {
      const element = event.target as HTMLButtonElement;
      const elementParent = element.parentNode as HTMLDivElement;
      const elementImg = elementParent.childNodes[0] as HTMLImageElement;
      const imgSrc = elementImg.src.split('/assets/')[1];

      const imgUrl = `assets/${imgSrc}`; // Caminho da img
      const name = elementParent.childNodes[1].childNodes[0]
        .textContent as string;
      const price = Number(
        elementParent.childNodes[3].childNodes[1].textContent,
      ); // Preço do carro

      const newItem = new CartItem(imgUrl, name, price); // Cria o cartItem

      setCartList((prevCartList) => {
        const updatedCartList = [...prevCartList, newItem]; // Faz uma copia do cartList original (prevCartList) e adiciona o novo item
        return updatedCartList; // O cartList agora vai pegar o valor do cartList atualizado
      });
    } else {
      toast.error('Faça login');
    }
  };

  const featuredCarsList1 = [
    {
      id: 1,
      name: 'Mercedes Benz SL',
      img: car1,
      price: 180000,
    },
    { id: 2, name: 'MG HS', img: car2, price: 46000 },
    { id: 3, name: 'Ford Focus ST', img: car3, price: 55000 },
    { id: 4, name: 'Audi E-tron', img: car4, price: 105000 },
  ];

  const featuredCarsList2 = [
    { id: 5, name: 'kia Sportage', img: car5, price: 35000 },
    { id: 6, name: 'Honda Civic', img: car6, price: 28000 },
    { id: 7, name: 'Kia Sorento', img: car7, price: 41000 },
    { id: 8, name: 'Chevrolet Equinox', img: car8, price: 35000 },
  ];

  return (
    <section
      id="destaque"
      className="p-interface py-8 text-center flex flex-col gap-4"
    >
      <h2 className="font-bold text-3xl">
        Carros de{' '}
        <span className="relative">
          Destaque
          <span className="after:inline-block after:bg-mainColor after:w-full after:h-1 after:absolute after:left-0 after:bottom-0"></span>
        </span>
      </h2>

      <Swiper
        className="w-full "
        slidesPerView={slidesPerView}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        navigation
        ref={swiper1}
        spaceBetween={16}
        onSlideNextTransitionStart={() => setSlideChanged(slidechanged + 1)}
        onSlidePrevTransitionStart={() => setSlideChanged(slidechanged + 1)}
      >
        {featuredCarsList1.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className="!flex flex-col gap-2 items-center bg-light-10% p-4 rounded group hover:cursor-grab"
            >
              <img
                src={item.img}
                alt="Carro"
                width={300}
                height={175}
                loading="lazy"
                className="scale-75 transition-transform duration-500 group-hover:scale-90"
              />
              <h3 className="font-bold text-2xl">{item.name}</h3>
              <div className="flex justify-center">
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
              <p className="text-xl">${item.price}</p>
              <button
                className={buttonCss}
                aria-labelledby="Checkout"
                onClick={(event) => addItemToShoppingCart(event)}
              >
                Checkout
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        className="w-full "
        slidesPerView={slidesPerView}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        navigation
        ref={swiper2}
        spaceBetween={16}
        onSlideNextTransitionStart={() => setSlideChanged(slidechanged + 1)}
        onSlidePrevTransitionStart={() => setSlideChanged(slidechanged + 1)}
      >
        {featuredCarsList2.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className="!flex flex-col gap-2 items-center bg-light-10% p-4 rounded group hover:cursor-grab"
            >
              <img
                src={item.img}
                alt="Carro"
                width={300}
                height={175}
                loading="lazy"
                className="scale-75 transition-transform duration-500 group-hover:scale-90"
              />
              <h3 className="font-bold text-2xl">{item.name}</h3>
              <div className="flex justify-center">
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
              <p className="text-xl">${item.price}</p>
              <button
                className={buttonCss}
                aria-label="Checkout"
                onClick={(event) => addItemToShoppingCart(event)}
              >
                Checkout
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
