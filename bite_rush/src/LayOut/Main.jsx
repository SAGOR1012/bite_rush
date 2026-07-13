import { Outlet } from 'react-router-dom';
// import App from '../App';
import Navbar from '../Componennts/Navbar/Navbar';

const Main = () => {
  return (
    <div className=' lg:px-52 py-2'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
