import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title text-center mb-12">Rreth Nesh</h1>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-playfair">Historia Jonë</h2>
          <p className="text-gray-600">
            Zoha's Home u themelua me pasionin për të sjellë bukurinë dhe rehatinë në çdo shtëpi.
            Ne besojmë se çdo shtëpi meriton të jetë një vend ku njerëzit ndjehen mirë dhe të rehatshëm.
          </p>
          <p className="text-gray-600">
            Me një koleksion të zgjedhur me kujdes të produkteve për shtëpi, ne ofrojmë
            zgjidhje të bukura dhe funksionale për çdo hapësirë.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-[400px]"
        >
          <div className="w-full h-full bg-soft-beige rounded-lg flex items-center justify-center text-gray-500">
            Imazhi i dyqanit do të shfaqet këtu
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-playfair text-center mb-12">Vlerat Tona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-playfair mb-4">Cilësia</h3>
            <p className="text-gray-600">
              Ne zgjedhim me kujdes çdo produkt për të siguruar cilësinë më të lartë
              për klientët tanë.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-playfair mb-4">Pasioni</h3>
            <p className="text-gray-600">
              Ne jemi të pasionuar për të ndihmuar njerëzit të krijojnë hapësira
              të bukura dhe të rehatshme.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-playfair mb-4">Shërbimi</h3>
            <p className="text-gray-600">
              Ne ofrojmë shërbim personalizuar dhe këshilla ekspertësh për
              çdo klient.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-playfair text-center mb-12">Ekipi Ynë</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-48 h-48 mx-auto mb-4 bg-soft-beige rounded-full flex items-center justify-center text-gray-500">
              Foto e ekipit
            </div>
            <h3 className="text-xl font-playfair mb-2">[Emri]</h3>
            <p className="text-gray-600">Themelues</p>
          </motion.div>
          {/* Add more team members as needed */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-playfair mb-6">Bashkohuni me Ne</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Vizitoni dyqanin tonë për të parë koleksionin tonë të plotë dhe për të marrë
          këshilla nga ekspertët tanë.
        </p>
        <Link to="/visit-us" className="btn-primary">
          Gjej Adresën Tonë
        </Link>
      </div>
    </div>
  );
};

export default About; 