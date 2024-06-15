import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Footer } from './components/Footer/indexFooter';
import { Header } from './components/Header/indexHeader';
import { RoutesFunction } from './routes/routes';
import { GlobalState } from './components/globalState/globalState';

export function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <Header />
        <RoutesFunction />
        <Footer />
        <div className="absolute">
          {/* Esse div atrapalha na estética do Header, Main e Footer pois quando alinhados usando space-between, ficavam 4 itens sendo que o correto é só 3 */}
          <ToastContainer autoClose={1500} />
        </div>
      </GlobalState>
    </BrowserRouter>
  );
}
