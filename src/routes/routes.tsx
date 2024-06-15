import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home/homeIndex';
import { Login } from '../pages/Login/loginIndex';
import { Payment } from '../pages/Payment/paymentIndex';
import { PrivateRoutes } from './PrivateRoutes';
import { ShoppingCart } from '../pages/ShoppingCart/indexShoppingCart';
import { Page404 } from '../pages/Page404/indexPage404';
import { Sucess } from '../pages/Sucess/indexSucess';

export function RoutesFunction() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        {/* Aqui dentro irão todas as rotas que só podem ser acessadas se o usuário estiver logado, PrivatesRoutes fará a verificação se o usuário está logado */}

        {/* A rota(URL) "/shoppingCart" ira renderizar a página ShoppingCart */}
        <Route path="/shoppingCart" element={<ShoppingCart />} />

        {/* A rota(URL) "/payment" ira renderizar a página Payment */}
        <Route path="/payment" element={<Payment />} />
      </Route>
      {/* A rota(URL) "/" ira renderizar a página Home */}
      <Route path="/" element={<Home />} />

      {/* A rota(URL) "/login" ira renderizar a página Login */}
      <Route path="/login" element={<Login />} />

      {/* A rota(URL) "/login" ira renderizar a página Login */}
      <Route path="/sucess" element={<Sucess />} />

      {/* Qualquer rota(URL) que não estiver configurada em routes.js ira renderizar a página de erro Page404  */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
