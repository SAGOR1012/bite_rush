import { useState } from 'react';
import {
  FaPlus,
  FaFire,
  FaHamburger,
  FaPizzaSlice,
  FaCookieBite,
  FaIceCream,
  FaGift,
} from 'react-icons/fa';
import { MdRiceBowl } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';
import FoodCard from '../FoodCard/FoodCard';

const foods = [
  {
    id: 1,
    category: 'Combo',
    name: 'Student Combo',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    description: 'Burger + Fries + Soft Drink',
    price: 199,
    oldPrice: 250,
    discount: '20% OFF',
  },
  {
    id: 2,
    category: 'Rice',
    name: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600',
    description: 'Authentic basmati rice',
    price: 220,
    oldPrice: 300,
    discount: '27% OFF',
  },
  {
    id: 3,
    category: 'Burger',
    name: 'Beef Burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600',
    description: 'Double Cheese Burger',
    price: 180,
    oldPrice: 230,
    discount: '22% OFF',
  },
  {
    id: 4,
    category: 'Pizza',
    name: 'Chicken Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    description: 'Cheesy Chicken Pizza',
    price: 350,
    oldPrice: 420,
    discount: '17% OFF',
  },
  {
    id: 5,
    category: 'Snacks',
    name: 'French Fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
    description: 'Golden Crispy Fries',
    price: 99,
    oldPrice: 120,
    discount: '18% OFF',
  },
  {
    id: 6,
    category: 'Drinks',
    name: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    description: 'Fresh Cold Coffee',
    price: 120,
    oldPrice: 150,
    discount: '20% OFF',
  },
  {
    id: 7,
    category: 'Desserts',
    name: 'Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    description: 'Soft Chocolate Cake',
    price: 180,
    oldPrice: 220,
    discount: '18% OFF',
  },
  {
    id: 8,
    category: 'Burger',
    name: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=600',
    description: 'Grilled Chicken Burger',
    price: 170,
    oldPrice: 210,
    discount: '19% OFF',
  },
];

const categories = [
  { name: 'All', icon: <FaFire /> },
  { name: 'Rice', icon: <MdRiceBowl /> },
  { name: 'Burger', icon: <FaHamburger /> },
  { name: 'Pizza', icon: <FaPizzaSlice /> },
  { name: 'Snacks', icon: <FaCookieBite /> },
  { name: 'Drinks', icon: <BiDrink /> },
  { name: 'Desserts', icon: <FaIceCream /> },
  { name: 'Combo', icon: <FaGift /> },
];

const FoodMenu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFoods =
    activeCategory === 'All'
      ? foods
      : foods.filter((food) => food.category === activeCategory);

  return (
    <div className='min-h-screen '>
      <div className='w-full mx-auto '>
        {/* Category Buttons */}
        <div className='overflow-x-auto mb-8 scrollbar-hide mt-5'>
          <div className='flex gap-3 w-max pb-2'>
            {categories.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border whitespace-nowrap transition-all duration-300

                ${
                  activeCategory === item.name
                    ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }`}>
                <span className='text-lg'>{item.icon}</span>
                <span className='font-medium'>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Food Cards */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
            />

            // <div
            //   key={food.id}
            //   className='bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition'>
            //   <div className='relative'>
            //     <img
            //       src={food.image}
            //       alt={food.name}
            //       className='h-48 w-full object-cover'
            //     />

            //     <span className='absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
            //       {food.discount}
            //     </span>
            //   </div>

            //   <div className='p-4'>
            //     <h2 className='text-xl font-bold'>{food.name}</h2>

            //     <p className='text-sm text-gray-500 mt-2'>{food.description}</p>

            //     <div className='flex justify-between items-center mt-5'>
            //       <div>
            //         <h3 className='text-2xl font-bold text-[var(--primary)]'>
            //           ৳{food.price}
            //         </h3>

            //         <p className='text-gray-400 line-through'>
            //           ৳{food.oldPrice}
            //         </p>
            //       </div>

            //       <button className='w-12 h-12 rounded-2xl bg-[var(--primary)] hover:bg-orange-600 text-white flex justify-center items-center transition'>
            //         <FaPlus />
            //       </button>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FoodMenu;
