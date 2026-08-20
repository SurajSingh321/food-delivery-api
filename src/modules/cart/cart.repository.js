const pool  =require("../../config/db")

const findCartByUser =async(user_id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM cart WHERE user_id = ?',
        [user_id]
    )
    return rows[0]||null
}

const createCart = async(user_id,restaurant_id)=>{
    const [result] = await pool.query(
        'INSERT INTO cart (user_id,restaurant_id) VALUES (?,?)',
        [user_id,restaurant_id]
    )
    return result.insertId
}

const clearCart = async(cart_id)=>{
    await pool.query("DELETE FROM cart_items WHERE cart_id = ?",[cart_id])
    await pool.query("DELETE FROM cart WHERE id =?",[cart_id])
}

const findCartItem = async(cart_id,food_id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM cart_items WHERE cart_id = ? AND food_id = ?',[cart_id,food_id]
    )
    return rows[0]||null
}

const addCartItem = async(cart_id,food_id,quantity)=>{
    const [result] = await pool.query(
        'INSERT INTO cart_items (cart_id,food_id,quantity) VALUES (?,?,?)',
        [cart_id,food_id,quantity]
    )
}

const updateCartItemQuantity = async(id,quantity)=>{
    await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ?',
        [quantity,id]
    )
}

const removeCartItem = async(id)=>{
    await pool.query('DELETE FROM cart_items WHERE id = ?',[id])
}

const findCartItemById = async(id)=>{
    const [rows] = await pool.query('SELECT * FROM cart_items WHERE id = ?',[id])
    return rows[0]||null
}

const getCartWithItems = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT 
      c.id as cart_id,
      c.restaurant_id,
      r.name as restaurant_name,
      ci.id as cart_item_id,
      ci.food_id,
      f.name as food_name,
      f.price,
      f.image,
      ci.quantity,
      (f.price * ci.quantity) as subtotal
    FROM cart c
    JOIN restaurants r ON c.restaurant_id = r.id
    JOIN cart_items ci ON c.id = ci.cart_id
    JOIN foods f ON ci.food_id = f.id
    WHERE c.user_id = ?`,
    [user_id]
  )
  return rows
}

module.exports = {
  findCartByUser,
  createCart,
  clearCart,
  findCartItem,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  findCartItemById,
  getCartWithItems,
}