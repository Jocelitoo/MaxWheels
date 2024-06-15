import { useContext } from 'react';
import { GlobalStateContext } from '../components/globalState/globalState';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function PrivateRoutes() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('Header must be used within a GlobalStateProvider');
  }

  const { logged } = context;
  const prevPath = useLocation().pathname; // Pega a URL da página que o usuário estava quando clicou em algo que precisava estar logado para usar

  // Verifica se o usuário está logado, se sim Outlet renderizará a rota filha, se não o Navigate redirecionará o usuário para a rota de login enviando um state que será a URL atual da página, para que quando o usuário logar ele seja redirecionado para onde estavá através desse state que tem a URL
  return logged ? <Outlet /> : <Navigate to="/login" state={prevPath} />;
}
