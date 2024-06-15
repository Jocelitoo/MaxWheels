import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { aCss } from '../../styles/header/a-css.tsx';
import { liCss } from '../../styles/header/li-css.tsx';
import { headerButtonCss } from '../../styles/header/header-button-css.tsx';

import { useContext } from 'react';
import { GlobalStateContext } from '../globalState/globalState.tsx';
import { toast } from 'react-toastify';

export function Header() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { logged, action, setAction, cartList, setCartList } = context;

  const [openNavBar, setOpenNavBar] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const logout = () => {
    sessionStorage.removeItem('loggedUser');
    setCartList([]);
    setAction(action + 1);
    toast.success('Usuario deslogado');
  };

  const redirectToHome = () => {
    if (path !== '/') navigate('/');
  };

  return (
    <header className="flex gap-4 p-interface justify-between items-center fixed top-0 left-0 right-0 py-2 bg-light shadow-md z-10">
      {openNavBar ? (
        <button
          className={`${headerButtonCss}`}
          aria-label="Fechar navegação"
          onClick={() => setOpenNavBar(false)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 384 512"
            className="text-5xl p-3 lg:hidden"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
          </svg>
        </button>
      ) : (
        <button
          className={`${headerButtonCss}`}
          aria-label="Abrir navegação"
          onClick={() => setOpenNavBar(true)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            className="text-5xl p-3 lg:hidden"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
          </svg>
        </button>
      )}

      <p className="text-2xl">
        <span className="text-mainColor">Max</span>Wheels
      </p>

      <nav
        className={`${openNavBar ? 'flex' : 'hidden'} absolute z-10 top-full left-0 w-full bg-light-10% lg:!flex lg:relative lg:bg-light `}
      >
        <ul className="flex flex-col items-center w-full lg:flex-row lg:gap-4 lg:justify-center">
          <li className={`${liCss}`} onClick={() => setOpenNavBar(false)}>
            <a
              href="#home"
              aria-labelledby="Home"
              className={`${aCss}`}
              onClick={() => redirectToHome()}
            >
              Home
            </a>
          </li>

          <li className={`${liCss}`} onClick={() => setOpenNavBar(false)}>
            <a
              href="#novos"
              aria-labelledby="Novos"
              className={`${aCss}`}
              onClick={() => redirectToHome()}
            >
              Novos
            </a>
          </li>

          <li className={`${liCss}`} onClick={() => setOpenNavBar(false)}>
            <a
              href="#servicos"
              aria-labelledby="Serviços"
              className={`${aCss}`}
              onClick={() => redirectToHome()}
            >
              Serviços
            </a>
          </li>

          <li className={`${liCss}`} onClick={() => setOpenNavBar(false)}>
            <a
              href="#destaque"
              aria-labelledby="Destaque"
              className={`${aCss}`}
              onClick={() => redirectToHome()}
            >
              Destaque
            </a>
          </li>

          <li className={`${liCss}`} onClick={() => setOpenNavBar(false)}>
            <a
              href="#reviews"
              aria-labelledby="Reviews"
              className={`${aCss}`}
              onClick={() => redirectToHome()}
            >
              Reviews
            </a>
          </li>

          <li className={`${liCss}`} onClick={() => setOpenNavBar(false)}>
            <a
              href="#contato"
              aria-labelledby="Contato"
              className={`${aCss}`}
              onClick={() => redirectToHome()}
            >
              Contato
            </a>
          </li>

          {logged && (
            <li
              className={`${liCss}`}
              onClick={() => {
                setOpenNavBar(false);
                logout();
              }}
            >
              <a href="#" className={`${aCss} sm:hidden`}>
                Sair
              </a>
            </li>
          )}
        </ul>
      </nav>

      {logged ? (
        <div className="flex gap-4">
          <button
            className={`${headerButtonCss} relative`}
            aria-label="Carrinho de compras"
            onClick={() => navigate('/shoppingCart')}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 576 512"
              className="text-5xl p-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
            {cartList.length > 0 && (
              <span
                className={`flex justify-center items-center absolute top-0 right-0 bg-red-500 text-white size-5 rounded-full `}
              >
                {cartList.length}
              </span>
            )}
          </button>

          <button
            className={`${headerButtonCss} hidden sm:!flex`}
            aria-label="Deslogar"
            onClick={() => logout()}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              className="text-5xl p-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
            </svg>
          </button>
        </div>
      ) : (
        <>
          <Link
            to={'/login'}
            aria-label="Login"
            className="hidden lg:!block lg:bg-mainColor lg:rounded lg:py-3 lg:px-6 hover:brightness-75 lg:transition lg:duration-500 "
          >
            Login
          </Link>

          <button
            className={`${headerButtonCss}`}
            aria-label="Login"
            onClick={() => navigate('/login')}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              className="text-5xl p-3 lg:hidden "
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
            </svg>
          </button>
        </>
      )}
    </header>
  );
}
