const pool = require('../../config/db')

const createAddress = async({user_id,label,address_line,city,state,pincode,is_default})=>{
    const [result] = await pool.query(
        'INSERT INTO addresses (user_id,label,address_line,city,state,pincode,is_default) VALUES (?,?,?,?,?,?,?)',
        [user_id,label,address_line,city,state,pincode,is_default]
    )
    return result.insertId
}

const findAddressByIdAndUser = async(id,user_id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM addresses where id = ? AND user_id = ?',
        [id,user_id]
    )
    return rows[0]||null
}

const findAllAddressesByUser = async(user_id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM addresses WHERE user_id = ?',
        [user_id]
    )
    return rows
}

const updateAddress = async(id,fields)=>{
    const key = Object.keys(fields)
    const values = Object.values(fields)
    const setClause = key.map((key)=>`${key}=?`).join(", ")
    values.push(id)
    await pool.query(`UPDATE addresses SET ${setClause} WHERE id = ?`,values)
}

const deleteAddress = async(id,user_id)=>{
    await pool.query('DELETE FROM addresses WHERE id = ? AND user_id = ?',[id,user_id])
}

const unsetDefaultAddress = async(user_id)=>{
    await pool.query('UPDATE addresses SET is_default = FALSE WHERE user_id =?',[user_id])
}

const setDefaultAddress = async (id, user_id) => {
  await pool.query('UPDATE addresses SET is_default = TRUE WHERE id = ? AND user_id = ?', [id, user_id]);
}

module.exports = {
  createAddress,
  findAddressByIdAndUser,
  findAllAddressesByUser,
  updateAddress,
  deleteAddress,
  unsetDefaultAddress,
  setDefaultAddress,
};