import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title text-center mb-12">Dyqani Ynë</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'all'
              ? 'bg-olive-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Të Gjitha
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category.name
                ? 'bg-olive-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="product-card"
          >
            <div className="relative h-[400px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-playfair mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-soft-beige text-gray-700 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/product/${product.id}`}
                className="text-olive-green hover:underline"
              >
                Shiko më shumë →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visit Store CTA */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-4">
          Për të parë koleksionin tonë të plotë, ju lutemi na vizitoni në dyqanin tonë.
        </p>
        <Link to="/visit-us" className="btn-primary">
          Gjej Adresën Tonë
        </Link>
      </div>
    </div>
  );
};

export default Shop; 