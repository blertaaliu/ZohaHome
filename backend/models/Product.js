const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Dekor', 'Kuzhina', 'Banjo', 'Dhoma', 'Kopsht', 'Të tjera']
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  material: String,
  color: String,
  brand: String,
  sku: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate SKU automatically
productSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = 'ZH-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Product', productSchema); 