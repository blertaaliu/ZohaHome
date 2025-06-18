import React from 'react';
import { motion } from 'framer-motion';

const VisitUs = () => {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title text-center mb-12">Na Vizitoni</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-playfair mb-4">Informacioni i Kontaktit</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Adresa:</span> [Adresa juaj këtu]
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Telefoni:</span> [Numri juaj këtu]
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> [Email juaj këtu]
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-playfair mb-4">Orari i Punës</h2>
              <div className="space-y-2">
                <p className="text-gray-600">E Hënë - E Premte: 9:00 - 20:00</p>
                <p className="text-gray-600">E Shtunë: 9:00 - 18:00</p>
                <p className="text-gray-600">E Dielë: E Mbyllur</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-playfair mb-4">Si të Na Gjeni</h2>
              <p className="text-gray-600 mb-4">
                Dyqani ynë ndodhet në qendër të qytetit, afër [pikë referimi].
                Mund të na gjeni lehtësisht duke ndjekur hartën më poshtë.
              </p>
              <div className="bg-soft-beige p-4 rounded-lg">
                <p className="text-gray-600">
                  <span className="font-semibold">Udhëzime:</span> [Udhëzime të detajuara për të arritur te dyqani]
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-[600px] bg-gray-200 rounded-lg"
          >
            {/* Replace this div with your actual map component or iframe */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Harta do të shfaqet këtu
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-playfair mb-4">Pse të Na Vizitoni?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-playfair mb-2">Koleksion i Gjerë</h3>
              <p className="text-gray-600">
                Zgjidhni nga një koleksion i gjerë produktesh për shtëpinë tuaj
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-playfair mb-2">Këshilla Ekspertësh</h3>
              <p className="text-gray-600">
                Merrni këshilla nga ekspertët tanë për të zgjedhur produktet e duhura
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-playfair mb-2">Cilësi e Lartë</h3>
              <p className="text-gray-600">
                Të gjitha produktet tona janë të zgjedhura me kujdes për cilësinë e tyre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitUs; 