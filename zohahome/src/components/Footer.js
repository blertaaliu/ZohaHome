import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaMapMarkerAlt, FaViber, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-olive-green/10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-playfair text-gray-800 mb-4">Na Kontaktoni</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FaMapMarkerAlt className="text-olive-green" />
              <span>Rr.Tirana Nr.58, Viti</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FaViber className="text-purple-500" />
              <span>+38349589882</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FaEnvelope className="text-olive-green" />
              <span>Zohas.home@hotmail.com</span>
            </div>
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
            <h3 className="text-lg font-playfair text-gray-800 mb-4 flex items-center gap-2"><FaClock className="text-olive-green" />Orari i Punës</h3>
            <div className="text-gray-600 text-sm">
              <div className="flex justify-between"><span>E Hënë - E Shtunë</span><span>9:00 - 18:00</span></div>
              <div className="flex justify-between"><span>E Diel</span><span className="text-red-500">Mbyllur</span></div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-playfair text-gray-800 mb-4">Na Ndiqni</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-olive-green transition-colors duration-300 text-2xl">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-olive-green transition-colors duration-300 text-2xl">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-olive-green transition-colors duration-300 text-2xl">
                <FaTiktok />
              </a>
            </div>
            <div className="text-gray-600 text-sm">Shopping & retail<br />Kualitet, Elegancë dhe Siguri ✨</div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <div className="flex justify-center mb-6">
            <iframe
              title="Zoha's Home Location"
              src="https://www.google.com/maps?q=Vitia,+Kosovo&output=embed"
              width="100%"
              height="180"
              className="rounded-xl border-2 border-gold shadow-md max-w-md w-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Zoha's Home. Të gjitha të drejtat e rezervuara.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 