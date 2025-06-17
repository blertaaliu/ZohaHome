import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-playfair text-gray-800 mb-4">Na Kontaktoni</h3>
            <p className="text-gray-600 mb-2">Adresa: [Adresa juaj këtu]</p>
            <p className="text-gray-600 mb-2">Tel: [Numri juaj këtu]</p>
            <p className="text-gray-600">Email: [Email juaj këtu]</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-playfair text-gray-800 mb-4">Lidhje të Shpejta</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-olive-green">
                  Dyqani
                </Link>
              </li>
              <li>
                <Link to="/visit-us" className="text-gray-600 hover:text-olive-green">
                  Na Vizitoni
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-olive-green">
                  Rreth Nesh
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-playfair text-gray-800 mb-4">Orari i Punës</h3>
            <p className="text-gray-600 mb-2">E Hënë - E Premte: 9:00 - 20:00</p>
            <p className="text-gray-600 mb-2">E Shtunë: 9:00 - 18:00</p>
            <p className="text-gray-600">E Dielë: E Mbyllur</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Zoha's Home. Të gjitha të drejtat e rezervuara.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 