import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const navItems = [
    { name: 'Track Order', path: '/track' },
    { name: 'Cart', path: '/cart' },
    { name: 'About', path: '/about' },
    { name: 'Order Table', path: '/orderTable' },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm rounded-2xl mb-5'>
      <div className='max-w-screen-full mx-auto px-5 h-16 flex items-center justify-between'>
        {/* Logo */}
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
        <div className='flex w-full gap-5  justify-end'>
          {/* Menu */}
          <div className='hidden md:flex items-center gap-8 '>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--primary)]'
                      : 'text-gray-500 hover:text-[var(--primary)]'
                  }`
                }>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Cart */}
          <button
            onClick={onCartClick}
            className='relative bg-[var(--secondary)] hover:bg-orange-100 rounded-xl p-3 transition'>
            <FaShoppingCart className='text-[var(--primary)] text-2xl' />

            {cartCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white'>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
