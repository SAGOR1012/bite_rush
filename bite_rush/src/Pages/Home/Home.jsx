import { useState } from 'react';
import FoodCarousel from '../../Componennts/Carousel/FoodCarousel';
import CartDrawer from '../../Componennts/CartDrawer/CartDrawer';
import FoodMenu from '../../Componennts/Categories/FoodMenu';
import Search_box from '../../Componennts/Search_box/Search_box';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div className=''>
      {/*  food carousel */}
      {/* <FoodCarousel></FoodCarousel> */}
      <FoodMenu
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <CartDrawer
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      {/* 
      Menu */}
      <div className='px-2 flex-row md:gap-10 lg:gap-20 justify-between items-center '>
        <h3 className='text-2xl font-bold text-gray-700 p-5'>Menu </h3>
        {/* Food Search  */}
        <Search_box></Search_box>
        <FoodMenu></FoodMenu>
      </div>
    </div>
  );
};

export default Home;
