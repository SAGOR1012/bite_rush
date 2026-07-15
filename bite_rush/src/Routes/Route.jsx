import { createBrowserRouter } from 'react-router-dom';
import Main from '../LayOut/Main';
import Home from '../Pages/Home/Home';
import CartDrawer from '../Componennts/CartDrawer/CartDrawer';
import About from '../Pages/About/About';
import OrderTable from '../Componennts/Order/OrderTable';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/orderTable',
        element: <OrderTable></OrderTable>,
      },
      {
        path: '/cart',
        element: <CartDrawer></CartDrawer>,
      },
    ],
  },
]);
