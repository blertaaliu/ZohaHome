import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../data/products';
import ballinaImage from '../assets/images/ballina.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-soft-beige"
        style={{
          backgroundImage: `url(${ballinaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-playfair text-white mb-6"
            >
              Zoha's Home
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              Bukurinë për shtëpinë tuaj
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/shop"
                className="btn-primary text-lg px-8 py-3"
              >
                Shiko Produktet
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Kategoritë Tona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className="product-card"
              >
                <div className="relative h-[400px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    to={`/shop?category=${category.name}`}
                    className="text-olive-green hover:underline"
                  >
                    Shiko më shumë →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="bg-soft-beige py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title">Na Vizitoni në Dyqan</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Për të parë koleksionin tonë të plotë dhe për të marrë këshilla nga ekspertët tanë,
            ju lutemi na vizitoni në dyqanin tonë.
          </p>
          <Link to="/visit-us" className="btn-primary">
            Gjej Adresën Tonë
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 