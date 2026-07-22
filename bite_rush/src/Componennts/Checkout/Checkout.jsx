import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaBolt } from 'react-icons/fa';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('auto');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const orderItems = [
    { name: 'Chicken Biryani', qty: 1, price: 100 },
    { name: 'French Fries', qty: 1, price: 60 },
    // { name: 'Mega Combo', qty: 1, price: 280 },
  ];

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);
  const bkashNumber = '01XXXXXXXXX';

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='max-w-md mx-auto flex flex-col gap-5'>
        {/* Order Summary */}
        <motion.div
          variants={cardVariant}
          className='bg-white rounded-2xl shadow-sm p-5'>
          <h2 className='font-bold text-gray-900 mb-4'>Order Summary</h2>

          <div className='flex flex-col gap-2.5'>
            {orderItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                className='flex items-center justify-between text-sm'>
                <span className='text-[var(--primary)]'>
                  {item.name} × {item.qty}
                </span>
                <span className='font-medium text-gray-900'>৳{item.price}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className='border-t border-gray-100 mt-4 pt-4 flex items-center justify-between'>
            <span className='font-bold text-gray-900'>Total</span>
            <span className='font-bold text-[var(--primary)] text-lg'>
              ৳{total}
            </span>
          </motion.div>
        </motion.div>

        {/* Your Info */}
        <motion.div
          variants={cardVariant}
          className='bg-white rounded-2xl shadow-sm p-5'>
          <h2 className='font-bold text-gray-900 mb-4'>Your Info</h2>

          <div className='flex flex-col gap-4'>
            <div>
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5'>
                <FaUser className='text-gray-400 text-xs' />
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                type='text'
                value={form.name}
                onChange={handleChange('name')}
                placeholder='Enter your name'
                className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-colors'
              />
            </div>

            <div>
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5'>
                <FaPhone className='text-gray-400 text-xs' />
                Phone Number
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                type='tel'
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder='01XXXXXXXXX'
                className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-colors'
              />
            </div>

            <div>
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5'>
                <FaEnvelope className='text-gray-400 text-xs' />
                Email{' '}
                <span className='text-gray-400 font-normal'>(optional)</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                type='email'
                value={form.email}
                onChange={handleChange('email')}
                placeholder='you@example.com'
                className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-colors'
              />
              <p className='text-xs text-blue-500 mt-1.5'>
                Receipt will be sent to this email after payment
              </p>
            </div>
          </div>
        </motion.div>

        {/* Payment (bKash) */}
        <motion.div
          variants={cardVariant}
          className='bg-white rounded-2xl shadow-sm p-5'>
          <h2 className='font-bold text-gray-900 mb-4'>Payment (bKash)</h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.35 }}
            className='bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4'>
            <p className='text-[var(--primary)] font-semibold text-sm'>
              Send ৳{total} to bKash
            </p>
            <p className='text-sm text-gray-800 mt-1'>
              Number: <span className='font-bold'>{bkashNumber}</span>
            </p>
            <p className='text-xs text-gray-400 mt-1'>
              Use "Send Money" or "Payment" option
            </p>
          </motion.div>

          <div className='flex flex-col gap-3'>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type='button'
              onClick={() => setPaymentMethod('manual')}
              animate={{
                borderColor:
                  paymentMethod === 'manual'
                    ? 'var(--primary)'
                    : 'rgb(229 231 235)',
              }}
              transition={{ duration: 0.2 }}
              className='flex items-start gap-3 text-left border rounded-xl p-4'>
              <span
                className='mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 relative'
                style={{
                  borderColor:
                    paymentMethod === 'manual'
                      ? 'var(--primary)'
                      : 'rgb(209 213 219)',
                }}>
                <AnimatePresence>
                  {paymentMethod === 'manual' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                      className='w-2 h-2 rounded-full bg-[var(--primary)]'
                    />
                  )}
                </AnimatePresence>
              </span>
              <span>
                <span className='block font-semibold text-gray-900 text-sm'>
                  Manual Payment
                </span>
                <span className='block text-xs text-gray-400 mt-0.5'>
                  Send money & enter TrxID
                </span>
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type='button'
              onClick={() => setPaymentMethod('auto')}
              animate={{
                borderColor:
                  paymentMethod === 'auto'
                    ? 'var(--primary)'
                    : 'rgb(229 231 235)',
                backgroundColor:
                  paymentMethod === 'auto'
                    ? 'rgb(255 247 237)'
                    : 'rgb(255 255 255)',
              }}
              transition={{ duration: 0.2 }}
              className='flex items-start gap-3 text-left border rounded-xl p-4'>
              <span
                className='mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0'
                style={{
                  borderColor:
                    paymentMethod === 'auto'
                      ? 'var(--primary)'
                      : 'rgb(209 213 219)',
                }}>
                <AnimatePresence>
                  {paymentMethod === 'auto' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                      className='w-2 h-2 rounded-full bg-[var(--primary)]'
                    />
                  )}
                </AnimatePresence>
              </span>
              <span>
                <span className='block font-semibold text-gray-900 text-sm'>
                  Auto Payment
                </span>
                <span className='block text-xs text-[var(--primary)]/80 mt-0.5'>
                  Pay via bKash link (redirects to bKash)
                </span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Place Order Button */}
        <motion.button
          variants={cardVariant}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          type='button'
          className='w-full bg-[var(--primary)] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm'>
          <motion.span
            animate={{ rotate: [0, -12, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}>
            <FaBolt className='text-sm' />
          </motion.span>
          Place Order — ৳{total}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Checkout;
