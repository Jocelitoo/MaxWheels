import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import vehicle1 from '../../assets/images/vehicle-1.png';
import vehicle2 from '../../assets/images/vehicle-2.png';
import vehicle3 from '../../assets/images/vehicle-3.png';
import vehicle4 from '../../assets/images/vehicle-4.png';
import vehicle5 from '../../assets/images/vehicle-5.png';
import vehicle6 from '../../assets/images/vehicle-6.png';
import { useEffect, useRef, useState } from 'react';
import { buttonCss } from '../../styles/button-css.tsx';
import { spanCss } from '../../styles/popular/span-css.tsx';
import { arrowCss } from '../../styles/arrow-css.tsx';
import { useContext } from 'react';
import {
  CarProtocol,
  GlobalStateContext,
} from '../globalState/globalState.tsx';
import { toast } from 'react-toastify';

// Precisa ficar fora do componente PopularVehicles pq o que está dentro do componente é redefinido em cada renderização do componente, então o id de todos os itens sempre seria 1
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

export function PopularVehicles() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { logged, setCartList } = context;

  const [slidesPerView, setSlidesPerView] = useState(1);
  const [slideChanged, setSlideChanged] = useState(0); // Toda vez que o Slide for mudado a constante slideChanged receberá +1, usaremos essa mudança no valor no useEffect para alterarmos o CSS do slide que está ativo

  const swiper = useRef<SwiperRef>(null);

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
    if (swiper.current?.children) {
      const childList = swiper.current.children as HTMLCollection; // Lista dos filhos da tag <Swiper>
      const swiperWrapper = childList[0] as HTMLDivElement; // Elemento HTML swiperWrapper
      const arrowLeft = childList[1] as HTMLDivElement; // Setinha da esquerda
      const arrowRight = childList[2] as HTMLDivElement; // Setinha da direita
      const pagination = childList[3].childNodes as NodeList; // Pontinhos da pagination

      swiperWrapper.style.paddingBottom = '40px';

      // CSS das setinhas
      if (slidesPerView === 3) {
        arrowRight.classList.add(...arrowCss);
        arrowLeft.classList.add(...arrowCss);
      } else {
        arrowLeft.classList.remove('!flex');
        arrowLeft.classList.add('hidden');

        arrowRight.classList.remove('!flex');
        arrowRight.classList.add('hidden');
      }

      // CSS do pagination
      pagination.forEach((item) => {
        // Pega cada item da lista pagination individualmente
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
  }, [slidesPerView, slideChanged]);

  const addItemToShoppingCart = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (logged) {
      const element = event.target as HTMLButtonElement;
      const elementParent = element.parentNode?.parentNode as HTMLDivElement;
      const elementImg = elementParent.childNodes[0] as HTMLImageElement;
      const imgSrc = elementImg.src.split('/assets/')[1];

      const imgUrl = `assets/${imgSrc}`; // Caminho da img
      const name = elementParent.childNodes[1].childNodes[0]
        .textContent as string;
      const price = Number(
        elementParent.childNodes[1].childNodes[2].childNodes[1].childNodes[1]
          .textContent,
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

  const vehicleGroup = [
    { id: 1, image: vehicle1, name: 'Porsche 911', price: 115000 },
    { id: 2, image: vehicle2, name: 'Porsche Panamera', price: 105000 },
    { id: 3, image: vehicle3, name: 'Porsche Panamera', price: 105000 },
    { id: 4, image: vehicle4, name: 'Porsche Cayman', price: 162000 },
    { id: 5, image: vehicle5, name: 'Porsche Boxster', price: 160000 },
    { id: 6, image: vehicle6, name: 'Porsche Cayenne', price: 95000 },
  ];

  return (
    <section
      id="novos"
      className="flex flex-col gap-2 p-interface py-8 bg-light"
    >
      <h2 className="font-bold text-center text-3xl">
        Veículos{' '}
        <span className="relative">
          Novos
          <span className="after:inline-block after:bg-mainColor after:w-full after:h-1 after:absolute after:left-0 after:bottom-0"></span>
        </span>
      </h2>

      <Swiper
        className="w-full "
        slidesPerView={slidesPerView}
        spaceBetween={16}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        navigation
        ref={swiper}
        onSlideNextTransitionStart={() => setSlideChanged(slideChanged + 1)}
        onSlidePrevTransitionStart={() => setSlideChanged(slideChanged + 1)}
      >
        {vehicleGroup.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className="bg-light-10% p-4 rounded group hover:cursor-grab"
            >
              <img
                src={item.image}
                alt="Imagem de um carro"
                className="scale-75 transition-transform duration-500 group-hover:scale-90"
                width={656}
                height={360}
              />

              <div className="flex flex-col items-center gap-2 text-center">
                <p className="font-bold text-xl">{item.name}</p>
                <p className="">Novo modelo</p>
                <p>
                  Preço: <span className="font-bold">${item.price}</span>
                </p>

                <ul className="flex flex-wrap justify-center gap-2 text-start">
                  <li>
                    <span className={spanCss}></span> Novo
                  </li>
                  <li>
                    <span className={spanCss}></span> 2024
                  </li>
                  <li>
                    <span className={spanCss}></span> Automático
                  </li>
                  <li>
                    <span className={spanCss}></span> Gasolina
                  </li>
                  <li>
                    <span className={spanCss}></span> 250km/h
                  </li>
                </ul>

                <button
                  className={buttonCss}
                  aria-labelledby="Checkout"
                  onClick={(event) => addItemToShoppingCart(event)}
                >
                  Checkout
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
