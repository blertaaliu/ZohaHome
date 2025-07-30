import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { categories } from '../data/products';
import ballinaImage from '../assets/images/ballina.jpg';
import { FaStar, FaMapMarkerAlt, FaViber, FaTruck, FaEnvelope } from 'react-icons/fa';
import storeImage from '../assets/images/dekor.jpg';
import { productsAPI } from '../services/api';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  const heroImages = [ballinaImage];
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    productsAPI.getFeatured().then(res => {
      setFeatured(res.data);
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative h-[85vh] bg-soft-beige overflow-hidden"
        style={{
          backgroundImage: `url(${ballinaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full"
        />

        <motion.div 
          className="relative h-full flex items-center justify-center text-center px-4"
          style={{ y, opacity }}
        >
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="inline-block mb-6"
              >
                <h1 className="text-6xl md:text-8xl font-playfair text-white mb-6 leading-tight drop-shadow-2xl">
                  Zoha's Home
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-xl md:text-3xl text-white/95 mb-10 font-light tracking-wide"
              >
                Bukuri për shtëpinë tuaj
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Link
                  to="/shop"
                  className="inline-block bg-white/20 backdrop-blur-md text-white text-lg px-10 py-4 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    Shiko Produktet
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-white/70 text-sm mb-2 tracking-wider">Zbulo</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="section-title text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Kategoritë Tona
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Zbuloni koleksionin tonë të gjerë të produkteve për çdo dhomë të shtëpisë
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -15 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[450px] overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </motion.div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <motion.h3 
                      className="text-3xl font-playfair mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p 
                      className="text-white/90 mb-6 text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      {category.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={`/shop?category=${category.name}`}
                        className="inline-flex items-center text-white hover:text-olive-green transition-colors text-lg font-medium"
                      >
                        Shiko më shumë 
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 8 }}
                          className="ml-3 text-2xl"
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="section-title text-4xl md:text-5xl mb-4">Produktet e Veçuara</h2>
            <p className="text-lg text-gray-600">Zbuloni zgjedhjet tona më të mira për ju</p>
          </motion.div>
          <div className="flex gap-8 overflow-x-auto pb-4">
            {featured.length === 0 ? (
              <div className="text-gray-400 text-lg mx-auto">Nuk ka produkte të veçuara aktualisht.</div>
            ) : (
              featured.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  className="min-w-[260px] bg-soft-beige rounded-lg shadow-md p-6 flex flex-col items-center"
                >
                  <Link to={`/product/${product._id}`} className="w-full flex flex-col items-center">
                    <img
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      className="w-40 h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2 text-center">{product.name}</h3>
                  </Link>
                  <p className="text-olive-green font-bold mb-2">€{product.price.toFixed(2)}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="bg-olive-green text-white px-4 py-2 rounded hover:bg-olive-dark transition-colors duration-200 mt-2"
                  >
                    Shiko Produktin
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-4xl md:text-5xl mb-4">Çfarë thonë klientët tanë?</h2>
            <p className="text-lg text-gray-600">Disa nga përshtypjet e klientëve tanë të kënaqur</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              name: 'Arta',
              text: 'Produktet janë të mrekullueshme dhe shërbimi ishte shumë i shpejtë!',
              rating: 5
            }, {
              name: 'Blerim',
              text: 'Cilësi e lartë dhe dizajn modern. Do të blej sërish!',
              rating: 4
            }, {
              name: 'Elira',
              text: 'Shumë e kënaqur me blerjen time. Rekomandoj Zoha Home!',
              rating: 5
            }].map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="flex mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-pastel-pink mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{t.text}"</p>
                <span className="font-semibold text-olive-green">- {t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 