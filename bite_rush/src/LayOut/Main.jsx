import { Outlet } from 'react-router-dom';
// import App from '../App';
import Navbar from '../Componennts/Navbar/Navbar';
import Footer from '../Componennts/Footer/Footer';

const Main = () => {
  return (
    <div className=' lg:px-64 '>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
