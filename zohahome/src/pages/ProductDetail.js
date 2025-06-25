import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productsAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
        
        // Fetch related products
        const relatedResponse = await productsAPI.getAll({ category: response.data.category, limit: 4 });
        setRelatedProducts(relatedResponse.data.products.filter(p => p._id !== id).slice(0, 3));
      } catch (error) {
        toast.error('Nuk mund të ngarkohet produkti');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">Duke ngarkuar...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair mb-4">Produkti nuk u gjet</h2>
          <Link to="/shop" className="text-olive-green hover:underline">
            Kthehu te dyqani →
          </Link>
        </div>
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
            {product.images && product.images[0] ? (
              <img
                src={`http://localhost:5000${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Nuk ka imazh</span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-playfair mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-bold text-olive-green">€{product.price}</span>
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

            {/* Stock */}
            <div className="mb-6">
              <span className="text-gray-600">Stoku:</span>
              <span className="ml-2 font-medium">
                {product.stock > 0 ? `${product.stock} në dispozicion` : 'Në mungesë'}
              </span>
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
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-8">Produkte të Ngjashme</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct._id}
                  whileHover={{ scale: 1.05 }}
                  className="product-card"
                >
                  <div className="relative h-64">
                    {relatedProduct.images && relatedProduct.images[0] ? (
                      <img
                        src={`http://localhost:5000${relatedProduct.images[0]}`}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Nuk ka imazh</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-olive-green font-bold mb-2">€{relatedProduct.price}</p>
                    <Link
                      to={`/product/${relatedProduct._id}`}
                      className="text-olive-green hover:underline"
                    >
                      Shiko më shumë →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 