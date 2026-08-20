const cartService = require('./cart.service');
const { successResponse } = require('../../utils/response');

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    successResponse(res, 200, 'Cart fetched successfully', cart);
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  try {
    console.log(req.body)
    const cart = await cartService.addToCart(req.user.id, req.body);
    successResponse(res, 200, 'Item added to cart', cart);
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    
    const cart = await cartService.updateCartItem(req.user.id, req.params.itemId, req.body.quantity);
    successResponse(res, 200, 'Cart item updated', cart);
  } catch (err) {
    next(err);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const cart = await cartService.removeFromCart(req.user.id, req.params.itemId);
    successResponse(res, 200, 'Item removed from cart', cart);
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const result = await cartService.clearCart(req.user.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};