const pool = require('../../config/db');

const createFood = async ({ restaurant_id, category_id, name, description, price, is_available }) => {
  const [result] = await pool.query(
    'INSERT INTO foods (restaurant_id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
    [restaurant_id, category_id || null, name, description || null, price, is_available ?? true]
  );
  return result.insertId;
};

const findFoodById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM foods WHERE id = ?', [id]);
  return rows[0] || null;
};

const findFoodsByRestaurant = async (restaurant_id, { category_id, search, page, limit }) => {
  let query = 'SELECT * FROM foods WHERE restaurant_id = ?';
  const params = [restaurant_id];

  if (category_id) {
    query += ' AND category_id = ?';
    params.push(category_id);
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

const updateFood = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  values.push(id);
  await pool.query(`UPDATE foods SET ${setClause} WHERE id = ?`, values);
};

const deleteFood = async (id) => {
  await pool.query('DELETE FROM foods WHERE id = ?', [id]);
};

module.exports = {
  createFood,
  findFoodById,
  findFoodsByRestaurant,
  updateFood,
  deleteFood,
};