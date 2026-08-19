const pool = require("../../config/db")

const createRestaurant = async({owner_id,name,description,phone,address,city,pincode})=>{
    const [result] = await pool.query(
         'INSERT INTO restaurants (owner_id, name, description, phone, address, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)',
         [owner_id, name, description, phone, address, city ,pincode ]
    )
    return result.insertId
}

const findRestaurantById = async(id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM restaurants WHERE id = ?',[id]
    )
    return rows[0]||null
}

const findRestaurantByOwner = async(owner_id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM restaurants WHERE owner_id = ?',[owner_id]
    )
    return rows[0]||null
}

const findAllRestaurants = async ({ city, is_open, search, page, limit }) => {
  let query = 'SELECT * FROM restaurants WHERE is_approved = TRUE';
  const params = [];

  if (city) {
    query += ' AND city = ?';
    params.push(city);
  }

  if (is_open !== undefined) {
    query += ' AND is_open = ?';
    params.push(is_open);
  }

  if (search) {
    query += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, (page - 1) * limit);

  const [rows] = await pool.query(query, params);
  return rows;
};

const updateRestaurant = async(id,fields)=>{
     const keys = Object.keys(fields)
     const values = Object.values(fields)
     const setClause = keys.map((keys)=>`${keys}=?`).join(", ")
     values.push(id)
     await pool.query(`UPDATE restaurants SET ${setClause} WHERE id  =?`,values)
}

const deleteRestaurant = async(id)=>{
    await pool.query('DELETE FROM restaurants WHERE id = ?',[id])
}

const approveRestaurant = async(id)=>{
    await pool.query('UPDATE restaurants SET is_approved = TRUE WHERE id = ?',[id])
}

const toggleRestaurantStatus = async(id,is_open)=>{
    await pool.query('UPDATE restaurants SET is_open =? WHERE id = ?',[is_open,id])
}

const findAllRestaurantsForAdmin = async()=>{
    const [rows] = await pool.query(
        'SELECT * FROM restaurants ORDER BY created_at DESC'
    )
    return rows
}


module.exports = {
  createRestaurant,
  findRestaurantById,
  findRestaurantByOwner,
  findAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  approveRestaurant,
  toggleRestaurantStatus,
  findAllRestaurantsForAdmin,
}