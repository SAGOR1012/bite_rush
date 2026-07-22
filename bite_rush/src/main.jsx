import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import { router } from './Routes/Route';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-screen-full h-screen  '>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
);
