import tepihImage from '../assets/images/tepih.jpg';
import mbulesaImage from '../assets/images/mbulesa.jpg';
import dekorImage from '../assets/images/dekor.jpg';

export const products = [
  {
    id: 1,
    name: 'Qilim Tradicional',
    category: 'Carpets',
    description: 'Qilim i bukur tradicionale me ngjyra të gjalla dhe motive të veçanta.',
    image: tepihImage,
    tags: ['Handmade', 'Traditional', 'Wool'],
  },
  {
    id: 2,
    name: 'Çarçaf Me Motive',
    category: 'Bed Covers',
    description: 'Çarçaf i butë me motive moderne dhe ngjyra të pastra.',
    image: mbulesaImage,
    tags: ['Cotton', 'Modern', 'Soft'],
  },
  {
    id: 3,
    name: 'Jastëk Dekorativ',
    category: 'Decor',
    description: 'Jastëk dekorativ me motive gjeometrike dhe ngjyra të harmonizuara.',
    image: dekorImage,
    tags: ['Decorative', 'Geometric', 'Modern'],
  },
];

export const categories = [
  {
    id: 1,
    name: 'Carpets',
    description: 'Qilima tradicionale dhe moderne',
    image: tepihImage,
  },
  {
    id: 2,
    name: 'Bed Covers',
    description: 'Çarçafe dhe mbulesa për shtrat',
    image: mbulesaImage,
  },
  {
    id: 3,
    name: 'Decor',
    description: 'Aksesorë dekorative për shtëpinë',
    image: dekorImage,
  },
]; 