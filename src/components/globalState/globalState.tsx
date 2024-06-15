import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { GlobalStateProps } from '../../protocols/globalState.tsx';

interface GlobalStateContextType {
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
  action: number;
  setAction: Dispatch<SetStateAction<number>>;
  cartList: CarProtocol[];
  setCartList: Dispatch<SetStateAction<CarProtocol[]>>;
  totalPrice: number;
}

export interface CarProtocol {
  id: number;
  img: string;
  name: string;
  price: number;
}

export const GlobalStateContext = createContext<
  GlobalStateContextType | undefined
>(undefined);

export function GlobalState({ children }: GlobalStateProps) {
  const [action, setAction] = useState(0); // Toda vez que o usuário logar ou deslogar isso aqui vai receber +1
  const [logged, setLogged] = useState(false);
  const [cartList, setCartList] = useState<CarProtocol[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Executa o código abaixo quando a página for carregada e quando a variável action sofrer alguma mudança
  useEffect(() => {
    sessionStorage.getItem('loggedUser') ? setLogged(true) : setLogged(false);
  }, [action]);

  // Executa o código abaixo quando a página for carregada e quando a variável cartList sofrer alguma mudança
  useEffect(() => {
    // O acumulador (acc) começa com 0 (tmb será o valor padrão caso o array cartList seja um array vazio), "item" é o nome dado pros elementos do array pegos individualmente. O acumulador vai receber o item.price de cada item do array cartList
    setTotalPrice(cartList.reduce((acc, item) => acc + item.price, 0));
  }, [cartList]);

  return (
    <GlobalStateContext.Provider
      value={{
        logged,
        setLogged,
        action,
        setAction,
        cartList,
        setCartList,
        totalPrice,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
