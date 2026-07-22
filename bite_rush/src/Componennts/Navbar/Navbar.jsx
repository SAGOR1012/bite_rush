// import { NavLink, Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';

// const Navbar = ({ cartCount = 0, onCartClick }) => {
//   const navItems = [
//     { name: 'Track Order', path: '/track' },
//     { name: 'Cart', path: '/cart' },
//     { name: 'About', path: '/about' },
//     { name: 'Order Table', path: '/orderTable' },
//   ];

//   return (
//     <nav className='sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm'>
//       {/* Desktop Navbar */}
//       <div className='hidden md:flex max-w-7xl mx-auto h-16 px-5 items-center justify-between'>
//         <Link
//           to='/'
//           className='flex items-center gap-3'>
//           <div className='w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white text-xl'>
//             ⚡
//           </div>

//           <h1 className='text-2xl font-bold'>
//             Bite<span className='text-[var(--primary)]'>Rush</span>
//           </h1>
//         </Link>

//         <div className='flex items-center gap-8'>
//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `font-medium transition ${
//                   isActive
//                     ? 'text-[var(--primary)]'
//                     : 'text-gray-500 hover:text-[var(--primary)]'
//                 }`
//               }>
//               {item.name}
//             </NavLink>
//           ))}

//           <button
//             onClick={onCartClick}
//             className='relative bg-[var(--secondary)] hover:bg-orange-100 rounded-xl p-3 transition'>
//             <FaShoppingCart className='text-[var(--primary)] text-xl' />

//             {cartCount > 0 && (
//               <span className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center'>
//                 {cartCount}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navbar */}
//       <div className='md:hidden'>
//         {/* Logo + Cart */}
//         <div className='flex items-center justify-between px-4 h-16'>
//           <Link
//             to='/'
//             className='flex items-center gap-2'>
//             <div className='w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white'>
//               ⚡
//             </div>

//             <h1 className='text-xl font-bold'>
//               Bite<span className='text-[var(--primary)]'>Rush</span>
//             </h1>
//           </Link>

//           <button
//             onClick={onCartClick}
//             className='relative bg-[var(--secondary)] p-3 rounded-xl'>
//             <FaShoppingCart className='text-[var(--primary)] text-xl' />

//             {cartCount > 0 && (
//               <span className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center'>
//                 {cartCount}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Mobile App Style Navigation */}
//         <div className='overflow-x-auto scrollbar-hide border-t'>
//           <div className='flex min-w-max px-3 py-2 gap-2'>
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
//                     isActive
//                       ? 'bg-[var(--primary)] text-white'
//                       : 'bg-gray-100 text-gray-600'
//                   }`
//                 }>
//                 {item.name}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { NavLink, Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaHome,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaClipboardList,
} from 'react-icons/fa';

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const navItems = [
    { name: 'Track Order', path: '/track' },
    { name: 'Cart', path: '/cart' },
    { name: 'Checkout', path: '/checkout' },
    { name: 'About', path: '/about' },
    { name: 'Order Table', path: '/orderTable' },
  ];

  // নিচের বটম নেভবারের জন্য আইকনসহ আইটেম
  const bottomNavItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Track', path: '/track', icon: FaMapMarkerAlt },
    { name: 'Cart', path: '/cart', icon: FaShoppingCart, badge: cartCount },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Orders', path: '/orderTable', icon: FaClipboardList },
  ];

  return (
    <>
      <nav className='sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm'>
        {/* Desktop Navbar */}
        <div className='hidden md:flex max-w-7xl mx-auto h-16 px-5 items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white text-xl'>
              ⚡
            </div>

            <h1 className='text-2xl font-bold'>
              Bite<span className='text-[var(--primary)]'>Rush</span>
            </h1>
          </Link>

          <div className='flex items-center gap-8'>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? 'text-[var(--primary)]'
                      : 'text-gray-500 hover:text-[var(--primary)]'
                  }`
                }>
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={onCartClick}
              className='relative bg-[var(--secondary)] hover:bg-orange-100 rounded-xl p-3 transition'>
              <FaShoppingCart className='text-[var(--primary)] text-xl' />

              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center'>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom App-Style Navbar */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'>
        <div className='flex items-center justify-around px-2 '>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition min-w-[56px] ${
                    isActive ? 'text-[var(--primary)]' : 'text-gray-400'
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <div
                      className={`relative flex items-center justify-center w-9 h-9 rounded-full transition ${
                        isActive ? 'bg-[var(--secondary)]' : ''
                      }`}>
                      <Icon className='text-lg' />

                      {item.badge > 0 && (
                        <span className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center'>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <span className='text-[11px] font-medium'>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* বটম নেভবারের নিচে কন্টেন্ট ঢাকা পড়া থেকে বাঁচাতে - main content wrapper এ এই padding দিতে হবে */}
      <div />
    </>
  );
};

export default Navbar;
