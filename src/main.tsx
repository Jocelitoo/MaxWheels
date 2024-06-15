import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.tsx';
import { register } from 'swiper/element-bundle';
import './index.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

register();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
