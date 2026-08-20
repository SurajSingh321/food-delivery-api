const cartRespository = require('./cart.repository')
const foodRespository = require("../food/food.repository")
const ApiError = require("../../utils/ApiError")

const getCart = async(userId)=>{
    const items = await cartRespository.getCartWithItems(userId)
    if(!items||items.length===0){
        return {cart_id:null, restaurant_id : null, restaurant_name: null ,items:[], total:0}
    }
    const total = items.reduce((sum,item)=> sum + parseFloat(item.subtotal),0)

    return {
        card_id:items[0].cart_id,
        restaurant_id: items[0].restaurant_id,
        restaurant_name:items[0].restaurant_name,
        items : items.map((item)=>({
            cart_item_id:item.cart_item_id,
            food_id:item.food_id,
            food_name:item.food_name,
            price:item.price,
            image:item.image,
            quantity:item.quantity,
            subtotal:item.subtotal
        })),
        total:total.toFixed(2)
    }
}

const addToCart = async(userId,{foodId,quantity= 1})=>{
    console.log(foodId)
    const food = await foodRespository.findFoodById(foodId)
    if(!food) throw new ApiError(404,"Food item not found")

    if(!food.is_available) throw new ApiError(400,"Food item not available")

    let cart = await cartRespository.findCartByUser(userId)
     
    // If cart exists but from different restaurant — clear it
    if(cart && cart.restaurant_id!==food.restaurant_id){
        await cartRespository.clearCart(cart.id)
        cart = null
    }
     
    // Create new cart if not exists
    if(!cart){
        const cartId = await cartRespository.createCart(userId,food.restaurant_id)
        cart = {id:cartId, restaurant_id:food.restaurant_id}
    }

    // Check if item already in cart
    const existingItem = await cartRespository.findCartItem(cart.id,foodId)
    if(existingItem){
        await cartRespository.updateCartItemQuantity(existingItem.id,existingItem.quantity+quantity)
    }else{
        await cartRespository.addCartItem(cart.id,foodId,quantity)
    }
    return await getCart(userId)
}

const updateCartItem = async(userId,cartItemId,quantity)=>{

    const cart = await cartRespository.findCartByUser(userId)
    if(!cart) throw new ApiError(404,"Cart Not Found")
    
    const item  = await cartRespository.findCartItemById(cartItemId)
    if(!item) throw new ApiError(404,"Cart item not found")
    if(item.cart_id !== cart.id) throw new ApiError(403,"You are not Authorized")
    
    if(quantity<=0){
        await cartRespository.removeCartItem(cartItemId)
    }else{
        await cartRespository.updateCartItemQuantity(cartItemId,quantity)
    }

    return await getCart(userId)

}

const removeFromCart = async (userId, cartItemId) => {
  const cart = await cartRespository.findCartByUser(userId);
  if (!cart) throw new ApiError(404, 'Cart not found');

  const item = await cartRespository.findCartItemById(cartItemId);
  if (!item) throw new ApiError(404, 'Cart item not found');
  if (item.cart_id !== cart.id) throw new ApiError(403, 'You are not authorized');

  await cartRespository.removeCartItem(cartItemId);

  return await getCart(userId);
};

const clearCart = async (userId) => {
  const cart = await cartRespository.findCartByUser(userId);
  if (!cart) throw new ApiError(404, 'Cart not found');

  await cartRespository.clearCart(cart.id);

  return { message: 'Cart cleared successfully' };
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
}