import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-playfair mb-4">Produkti nuk u gjet</h2>
        <Link to="/shop" className="text-olive-green hover:underline">
          Kthehu te dyqani →
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[500px]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-playfair mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-soft-beige text-gray-700 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Category */}
            <div className="mb-6">
              <span className="text-gray-600">Kategoria:</span>
              <Link
                to={`/shop?category=${product.category}`}
                className="ml-2 text-olive-green hover:underline"
              >
                {product.category}
              </Link>
            </div>

            {/* Visit Store CTA */}
            <div className="mt-auto">
              <p className="text-gray-600 mb-4">
                Për të parë këtë produkt dhe koleksionin tonë të plotë,
                ju lutemi na vizitoni në dyqanin tonë.
              </p>
              <Link to="/visit-us" className="btn-primary">
                Gjej Adresën Tonë
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="section-title mb-8">Produkte të Ngjashme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ scale: 1.05 }}
                  className="product-card"
                >
                  <div className="relative h-64">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair mb-2">
                      {relatedProduct.name}
                    </h3>
                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="text-olive-green hover:underline"
                    >
                      Shiko më shumë →
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 