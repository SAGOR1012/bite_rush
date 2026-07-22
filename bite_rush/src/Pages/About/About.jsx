import {
  FaUtensils,
  FaShippingFast,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaStar,
} from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaUtensils />,
      title: 'Fresh & Delicious Food',
      description:
        'Every meal is prepared with fresh ingredients to ensure the best taste and quality.',
    },
    {
      icon: <FaShippingFast />,
      title: 'Fast Delivery',
      description:
        'Order your food online and receive it quickly with our token-based pickup system.',
    },
    {
      icon: <FaClock />,
      title: 'Save Your Time',
      description:
        'Skip the long queues in the cafeteria by placing your order in advance.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Payment',
      description:
        'Safe and reliable payment methods including Cash, bKash, and other digital options.',
    },
    {
      icon: <FaUsers />,
      title: 'Student Friendly',
      description:
        'Affordable meals specially designed for university students and faculty members.',
    },
    {
      icon: <FaStar />,
      title: 'Quality Service',
      description:
        'Our goal is to provide an excellent food ordering experience every day.',
    },
  ];

  return (
    <div className='bg-gray-50'>
      {/* Hero Section */}

      <section className='bg-gradient-to-r from-orange-500 to-orange-600 text-white py-24'>
        <div className='max-w-7xl mx-auto px-5 text-center'>
          <h1 className='text-5xl font-bold'>
            About Bite<span className='text-yellow-300'>Rush</span>
          </h1>

          <p className='max-w-3xl mx-auto mt-6 text-lg leading-8 text-orange-100'>
            BiteRush is a modern university food ordering platform that allows
            students and teachers to order meals online, make secure payments,
            receive an order token, and collect food without waiting in long
            cafeteria queues.
          </p>
        </div>
      </section>

      {/* About */}

      <section className='max-w-7xl mx-auto px-5 py-20'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div>
            <img
              src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900'
              alt='Restaurant'
              className='rounded-3xl shadow-xl'
            />
          </div>

          <div>
            <span className='bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold'>
              WHO WE ARE
            </span>

            <h2 className='text-4xl font-bold mt-5'>
              Making Food Ordering Easier for Everyone
            </h2>

            <p className='text-gray-600 mt-6 leading-8'>
              BiteRush was created to simplify food ordering inside university
              campuses. Instead of waiting in long lines, users can browse the
              menu, place an order, complete payment, and receive a unique
              token. This improves efficiency for both customers and cafeteria
              staff.
            </p>

            <p className='text-gray-600 mt-4 leading-8'>
              Our mission is to deliver a fast, reliable, and user-friendly
              digital experience while helping cafeterias manage orders more
              efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className='max-w-7xl mx-auto px-5 pb-20'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold'>Why Choose BiteRush?</h2>

          <p className='text-gray-500 mt-3'>
            Designed to provide the best food ordering experience.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300'>
              <div className='w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center text-2xl'>
                {feature.icon}
              </div>

              <h3 className='text-2xl font-semibold mt-6'>{feature.title}</h3>

              <p className='text-gray-600 mt-4 leading-7'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}

      <section className='bg-orange-500 text-white py-16'>
        <div className='max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-10 text-center'>
          <div>
            <h2 className='text-5xl font-bold'>500+</h2>
            <p className='mt-2'>Happy Students</p>
          </div>

          <div>
            <h2 className='text-5xl font-bold'>100+</h2>
            <p className='mt-2'>Food Items</p>
          </div>

          <div>
            <h2 className='text-5xl font-bold'>1000+</h2>
            <p className='mt-2'>Orders Delivered</p>
          </div>

          <div>
            <h2 className='text-5xl font-bold'>99%</h2>
            <p className='mt-2'>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Mission */}

      <section className='max-w-5xl mx-auto px-5 py-20 text-center'>
        <h2 className='text-4xl font-bold'>Our Mission</h2>

        <p className='mt-6 text-gray-600 leading-8 text-lg'>
          We aim to modernize university cafeteria services by providing a
          digital food ordering platform that saves time, reduces waiting,
          improves customer satisfaction, and supports efficient cafeteria
          management.
        </p>
      </section>
    </div>
  );
};

export default About;
