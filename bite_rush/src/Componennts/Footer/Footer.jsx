import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 mt-20'>
      <div className='max-w-7xl mx-auto px-6 py-14'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* Logo */}
          <div>
            <h2 className='text-3xl font-bold text-white'>
              Bite<span className='text-[var(--primary)]'>Rush</span>
            </h2>

            <p className='mt-4 text-gray-400 leading-7'>
              Delicious food delivered fast. Order your favorite meals anytime,
              anywhere with BiteRush.
            </p>

            <div className='flex gap-4 mt-6'>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--primary)] transition flex items-center justify-center'>
                <FaFacebookF />
              </a>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--primary)] transition flex items-center justify-center'>
                <FaInstagram />
              </a>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--primary)] transition flex items-center justify-center'>
                <FaLinkedinIn />
              </a>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--primary)] transition flex items-center justify-center'>
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-semibold text-white mb-5'>
              Quick Links
            </h3>

            <ul className='space-y-3'>
              <li>
                <a
                  href='/'
                  className='hover:text-[var(--primary)] transition'>
                  Home
                </a>
              </li>
              <li>
                <a
                  href='/menu'
                  className='hover:text-[var(--primary)] transition'>
                  Menu
                </a>
              </li>
              <li>
                <a
                  href='/offers'
                  className='hover:text-[var(--primary)] transition'>
                  Offers
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='hover:text-[var(--primary)] transition'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className='text-xl font-semibold text-white mb-5'>
              Categories
            </h3>

            <ul className='space-y-3'>
              <li>Burger</li>
              <li>Pizza</li>
              <li>Rice</li>
              <li>Snacks</li>
              <li>Drinks</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='text-xl font-semibold text-white mb-5'>Contact</h3>

            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <FaMapMarkerAlt className='text-[var(--primary)] mt-1' />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className='flex items-center gap-3'>
                <FaPhoneAlt className='text-[var(--primary)]' />
                <p>+8801739136200</p>
              </div>

              <div className='flex items-center gap-3'>
                <FaEnvelope className='text-[var(--primary)]' />
                <p>support@biterush.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-6 text-center text-gray-500'>
          © {new Date().getFullYear()}{' '}
          <span className='font-semibold'>
            Bite<span className='text-[var(--primary)] '>Rush</span>
          </span>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
