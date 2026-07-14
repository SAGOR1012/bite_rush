// Import the Plus icon from react-icons library
import { FaPlus } from 'react-icons/fa';

const FoodCard = ({ food }) => {
  return (
    // Main card container
    <div
      key={food.id}
      className='bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition'>
      {/* Image section  */}
      <div className='relative'>
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

          {/* Add to cart button  */}
          <button className='w-12 h-12 rounded-2xl bg-[var(--primary)] hover:bg-orange-600 text-white flex justify-center items-center transition'>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
