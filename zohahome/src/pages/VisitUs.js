import React from 'react';
import { FaMapMarkerAlt, FaViber, FaTruck, FaStar, FaEnvelope } from 'react-icons/fa';
import storeImage from '../assets/images/dekor.jpg';

const VisitUs = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-soft-beige via-white to-soft-beige flex flex-col items-center px-4">
      <div className="bg-white/90 rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left: Store Image */}
        <div className="hidden md:block md:w-1/2 bg-soft-beige">
          <img src={storeImage} alt="Zoha Home Store" className="object-cover w-full h-full min-h-[500px]" />
        </div>
        {/* Right: Info Card */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-4 text-center md:text-left">
            <span className="block text-xl font-playfair text-yellow-700 tracking-widest mb-2">JU MIRËPRESIM</span>
            <h1 className="text-4xl md:text-5xl font-playfair text-olive-green mb-2 flex items-center gap-3 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-pastel-pink" /> Zoha's HOME
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-pastel-pink via-olive-green to-pastel-pink rounded-full mx-auto md:mx-0 mb-4"></div>
          </div>
          {/* Hours */}
          <div className="mb-6">
            <h2 className="text-2xl font-playfair text-olive-green mb-2">Orari i Punës</h2>
            <div className="bg-soft-beige rounded-xl shadow p-4 max-w-xs mx-auto md:mx-0">
              <div className="grid grid-cols-2 gap-2 text-lg font-medium text-gray-700">
                <span>E Hënë - E Shtunë</span><span>9:00 - 18:00</span>
                <span>E Diel</span><span className="text-red-500">Mbyllur</span>
              </div>
            </div>
          </div>
          {/* Contact Info */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 text-lg text-gray-700 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-olive-green" />
              <span>Rr.Tirana Nr.58, VITI</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-700 justify-center md:justify-start">
              <FaViber className="text-purple-500" />
              <span>Viber: <a href="viber://chat?number=+38349589882" className="underline hover:text-olive-green">+38349589882</a></span>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-700 justify-center md:justify-start">
              <FaEnvelope className="text-olive-green" />
              <span>Zohas.home@hotmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-700 justify-center md:justify-start">
              <FaTruck className="text-olive-green" />
              <span>Porosite online📥, transporti në 🇽🇰🇦🇱🇲🇰</span>
            </div>
          </div>
          {/* Divider */}
          <div className="my-6 border-t border-olive-green/20"></div>
          {/* Map */}
          <div className="my-4 rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Zoha's Home Location"
              src="https://www.google.com/maps?q=Rr.Tirana+Nr.58,+Viti&output=embed"
              width="100%"
              height="220"
              className="w-full h-56 border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Slogan */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex items-center gap-2 text-xl text-olive-green font-semibold">
              <FaStar className="text-pastel-pink" />
              Kualitet, Elegancë dhe Siguri ✨
            </div>
            <p className="text-gray-600 mt-2">Shopping & retail</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitUs; 