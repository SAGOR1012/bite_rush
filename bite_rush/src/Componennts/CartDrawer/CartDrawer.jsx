import { useState } from 'react';
import {
  FaMinus,
  FaPlus,
  FaTrashAlt,
  FaShoppingBag,
  FaTruck,
  FaTag,
  FaCreditCard,
  FaArrowRight,
  FaRegHeart,
  FaShareAlt,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const initialCartItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300',
    price: 100,
    qty: 1,
    description: 'Authentic Hyderabadi biryani with aromatic spices',
  },
  {
    id: 2,
    name: 'French Fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300',
    price: 60,
    qty: 1,
    description: 'Crispy golden fries with special seasoning',
  },
  {
    id: 3,
    name: 'Mango Lassi',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300',
    price: 70,
    qty: 1,
    description: 'Creamy mango yogurt drink',
  },
  {
    id: 4,
    name: 'Chocolate Brownie',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300',
    price: 100,
    qty: 1,
    description: 'Warm chocolate brownie with fudge sauce',
  },
];

const CartDrawer = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const delivery = subtotal > 0 ? 30 : 0;
  const discount = subtotal >= 200 ? 20 : 0;
  const total = subtotal + delivery - discount;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => setIsCheckingOut(false), 2000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-[var(--primary)] to-orange-600 p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center'>
                <FaShoppingBag className='text-white text-xl' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-white'>Your Cart</h2>
                <p className='text-orange-100 text-sm'>
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </p>
              </div>
            </div>
            <div className='flex gap-2'>
              <button className='w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition'>
                <FaRegHeart className='text-white' />
              </button>
              <button className='w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition'>
                <FaShareAlt className='text-white' />
              </button>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className='p-5 space-y-4 max-h-[460px] overflow-y-auto custom-scrollbar'>
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className='bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow group'>
                <div className='flex items-center gap-4'>
                  <div className='relative'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-20 h-20 rounded-2xl object-cover'
                    />
                    <div className='absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                      {item.qty}
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-gray-800 truncate'>
                      {item.name}
                    </h3>
                    <p className='text-xs text-gray-500 truncate'>
                      {item.description}
                    </p>
                    <p className='text-[var(--primary)] font-bold mt-1'>
                      ৳{item.price}
                    </p>
                  </div>

                  <div className='flex flex-col items-end gap-2'>
                    <div className='flex items-center gap-1 bg-white rounded-full shadow-sm p-1'>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition'>
                        <FaMinus size={10} />
                      </button>
                      <span className='font-semibold w-5 text-center text-sm'>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className='w-8 h-8 rounded-full bg-[var(--primary)] hover:bg-orange-600 text-white flex items-center justify-center transition'>
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className='text-gray-400 hover:text-red-500 transition text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100'>
                      <FaTrashAlt size={12} />
                      <span className='text-xs'>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {cartItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-12'>
              <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaShoppingBag className='text-gray-400 text-3xl' />
              </div>
              <h3 className='text-lg font-semibold text-gray-600'>
                Your cart is empty
              </h3>
              <p className='text-gray-400 text-sm mt-1'>
                Add some delicious items!
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className='border-t border-gray-100 p-6 bg-gradient-to-b from-white to-gray-50'>
          <div className='space-y-3'>
            <div className='flex justify-between text-gray-600'>
              <span className='flex items-center gap-2'>
                <span>Subtotal</span>
              </span>
              <span className='font-medium'>৳{subtotal}</span>
            </div>

            <div className='flex justify-between text-gray-600'>
              <span className='flex items-center gap-2'>
                <FaTruck className='text-gray-400' />
                <span>Delivery Fee</span>
              </span>
              <span className='font-medium'>
                {delivery > 0 ? `৳${delivery}` : 'Free'}
              </span>
            </div>

            {discount > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className='flex justify-between text-green-600'>
                <span className='flex items-center gap-2'>
                  <FaTag className='text-green-500' />
                  <span>Discount</span>
                </span>
                <span className='font-medium'>-৳{discount}</span>
              </motion.div>
            )}

            <div className='border-t border-gray-200 pt-4 flex justify-between items-center'>
              <div>
                <p className='text-sm text-gray-500'>Total</p>
                <h2 className='text-4xl font-bold text-[var(--primary)]'>
                  ৳{total}
                </h2>
              </div>
              <div className='bg-orange-100 text-[var(--primary)] font-semibold px-4 py-2 rounded-xl flex items-center gap-2'>
                <span>{cartItems.length}</span>
                <span>Items</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isCheckingOut}
            className={`w-full mt-6 text-white font-semibold text-lg py-4 rounded-2xl transition flex items-center justify-center gap-3 ${
              cartItems.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-[var(--primary)] to-orange-600 hover:shadow-lg'
            }`}>
            {isCheckingOut ? (
              <>
                <svg
                  className='animate-spin h-5 w-5'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaCreditCard />
                Proceed to Checkout
                <FaArrowRight />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fb923c;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
