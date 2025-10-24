const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

let cart = [];

// Get all products
router.get('/products', (req, res) => {
  res.json(products);
});

// Get cart items
router.get('/', (req, res) => {
  res.json(cart);
});

// Add item to cart
router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const cartItem = cart.find(c => c.product.id === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  res.json(cart);
});

// Remove item from cart
router.post('/remove', (req, res) => {
  const { productId } = req.body;
  cart = cart.filter(c => c.product.id !== productId);
  res.json(cart);
});

module.exports = router;
