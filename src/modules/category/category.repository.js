const pool = require('../../config/db');

const createCategory = async (name) => {
  const [result] = await pool.query(
    'INSERT INTO categories (name) VALUES (?)',
    [name]
  );
  return result.insertId;
};

const findCategoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0] || null;
};

const findCategoryByName = async (name) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE name = ?', [name]);
  return rows[0] || null;
};

const findAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
  return rows;
};

const updateCategory = async (id, name) => {
  await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
};

const deleteCategory = async (id) => {
  await pool.query('DELETE FROM categories WHERE id = ?', [id]);
};

module.exports = {
  createCategory,
  findCategoryById,
  findCategoryByName,
  findAllCategories,
  updateCategory,
  deleteCategory,
};