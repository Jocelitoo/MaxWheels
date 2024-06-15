import { useContext, useEffect } from 'react';
import {
  CarProtocol,
  GlobalStateContext,
} from '../../components/globalState/globalState.tsx';
import { headerButtonCss } from '../../styles/header/header-button-css.tsx';
import { buttonCss } from '../../styles/button-css.tsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function ShoppingCart() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { cartList, setCartList, totalPrice } = context;
  const navigate = useNavigate();

  const deleteCartItem = (
    previousCartList: CarProtocol[],
    item: CarProtocol,
  ) => {
    const newCartList = [...previousCartList]; // Copia o valor de "previousCartList" para "newCartList" e se torna independente(alteração em "newCartList" n vai alterar "previousCartList")
    const deleteItemIndex = newCartList.indexOf(item);
    newCartList.splice(deleteItemIndex, 1);

    return newCartList;
  };

  // Remove o scrollY quando a página é aberta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="my-16 h-auto">
      <section className="mt-8 p-interface flex flex-col gap-4 lg:flex-row">
        <div className="p-4 rounded w-full bg-light-10%">
          <h1 className="font-bold text-2xl text-center mb-4">
            Carrinho de compras
          </h1>

          {cartList.length === 0 ? (
            <p className="text-center">Seu carrinho está vazio</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {cartList.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex flex-col justify-between sm:flex-row items-center text-center bg-light rounded p-2 sm:gap-6"
                  >
                    <img src={item.img} alt="" className="w-40" />
                    <div className="flex flex-col w-full items-center sm:flex-row sm:justify-between">
                      <p className="">{item.name}</p>
                      <p className="">${item.price}</p>
                    </div>

                    <button
                      className={`${headerButtonCss} group`}
                      aria-label="Remover"
                      onClick={() => {
                        setCartList((previousCartList) =>
                          deleteCartItem(previousCartList, item),
                        );
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        className="text-5xl p-3 transition-colors duration-500 group-hover:fill-white group-focus:fill-white"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="h-fit bg-light-10% p-4 rounded flex flex-col gap-4 lg:w-1/4">
          <p>
            Total: <span className="font-bold">${totalPrice}</span>
          </p>
          <button
            aria-labelledby="Fechar pedido"
            className={buttonCss}
            onClick={() => {
              {
                cartList.length > 0
                  ? navigate('/payment')
                  : toast.error('Adicione algo no carrinho');
              }
            }}
          >
            Fechar pedido
          </button>
        </div>
      </section>
    </main>
  );
}
