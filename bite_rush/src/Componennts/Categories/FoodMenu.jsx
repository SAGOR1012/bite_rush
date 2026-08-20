import { useEffect, useState } from 'react';
import {
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

const baseURL = import.meta.env.VITE_API_BASEURL;

const FoodMenu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');

  // Cart state
  const [cart, setCart] = useState([]);

  /* Fetch Foods data from database */
  useEffect(() => {
    fetch(`${baseURL}/all_foods`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filteredFoods =
    activeCategory === 'All'
      ? foods
      : foods.filter((food) => food.category === activeCategory);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <span className='loading loading-spinner loading-lg text-[var(--primary)]'>
          loading....
        </span>
      </div>
    );
  }

  // =========================
  // Add Food To Cart
  // =========================
  const handleAddToCart = async (food) => {
    try {
      // Check if food already exists in frontend cart
      const existingFood = cart.find((item) => item._id === food._id);

      let updatedCart;

      // =========================
      // If food already exists
      // =========================
      if (existingFood) {
        updatedCart = cart.map((item) =>
          item._id === food._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // =========================
      // If food is new
      // =========================
      else {
        updatedCart = [
          ...cart,
          {
            ...food,
            quantity: 1,
          },
        ];
      }

      // Update frontend cart
      setCart(updatedCart);

      // =========================
      // Send data to backend
      // =========================
      const cartItem = {
        foodId: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity: existingFood ? existingFood.quantity + 1 : 1,
      };

      const response = await fetch(`${baseURL}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Cart added successfully:', data);
      } else {
        console.log('Failed to add cart:', data);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  console.log('Frontend Cart:', cart);

  return (
    <div className='min-h-screen'>
      <div className='w-full mx-auto'>
        {/* Category Buttons */}
        <div className='overflow-x-auto mb-8 scrollbar-hide mt-5'>
          <div className='flex gap-3 w-max pb-2'>
            {categories.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border whitespace-nowrap transition-all duration-300 ${
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
        {filteredFoods.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredFoods.map((food, index) => (
              <FoodCard
                key={food._id}
                food={food}
                index={index}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center h-40'>
            <h2 className='text-xl font-semibold text-gray-500'>
              No Food Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;
