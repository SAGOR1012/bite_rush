// Import motion from framer-motion
import { motion } from 'framer-motion';
// Import the Plus icon from react-icons library
import { FaPlus } from 'react-icons/fa';

// const FoodCard = ({ food, index, onAddToCart }) => {
const FoodCard = ({ food, index, onAddToCart }) => {
  // const handleAddToCart = () => {
  //   onAddToCart(food);
  // };

  return (
    // Main card container wrapped with motion
    <motion.div
      className='bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition'
      // Hover effect matching your previous context
      whileHover={{ y: -5, scale: 1.02 }}>
      {/* Image section  */}
      <div className='relative'>
        <motion.div
          // Key is required for AnimatePresence to track items
          key={food.id}
          // Entrance / Exit animations
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          // Stagger delay based on the index prop
          transition={{ delay: index * 0.05, duration: 0.4 }}>
          {/* Food item image */}
          <img
            src={food.image}
            alt={food.name}
            className='h-48 w-full object-cover'
          />

          {/* Discount badge positioned at top-left corner */}
          <span className='absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
            {food.discount}
          </span>
        </motion.div>
      </div>

      {/* Content section and pricing */}
      <div className='p-4'>
        {/* Food name */}
        <h2 className='text-xl font-bold'>{food.name}</h2>

        {/* Food description */}
        <p className='text-sm text-gray-500 mt-2'>{food.description}</p>

        {/* Price and add to cart button container */}
        <div className='flex justify-between items-center mt-5'>
          {/* Price information section */}
          <div>
            {/* Current/discounted price */}
            <h3 className='text-2xl font-bold text-[var(--primary)]'>
              ৳{food.price}
            </h3>

            {/* Original price  */}
            <p className='text-gray-400 line-through'>৳{food.oldPrice}</p>
          </div>

          {/* Add to cart button with motion effect */}
          <motion.button
            // onClick={() => console.log(`Add ${food.name} to cart`)}
            onClick={() => onAddToCart(food)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center transition cursor-pointer'>
            <FaPlus />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
