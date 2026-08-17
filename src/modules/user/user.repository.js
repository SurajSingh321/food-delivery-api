const { object } = require("joi")
const pool = require("../../config/db")

const findUserById = async(id)=>{
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    )
    return rows[0]||null
}

const updateUser = async(id,fields)=>{
    const key = Object.keys(fields)
    const values = Object.values(fields)

    const setClause = key.map((key)=>`${key} = ?`).join(', ')
    values.push(id)

    await pool.query(`UPDATE users SET ${setClause} WHERE id = ?`,values)
}

const deleteUser = async(id)=>{
    await pool.query('DELETE FROM users WHERE id = ?',[id])
}

const findAllUsers = async()=>{
    const [rows] = await pool.query(
        "SELECT id, name, email, phone, role, is_active, is_verified, created_at FROM users"
    )
    return rows
}


const updateUserRole = async(id,role)=>{
    await pool.query(
        'UPDATE users SET role = ? WHERE id = ?',[role,id]
    )
}

const updateUserStatus = async(id,is_active)=>{
    await pool.query('UPDATE users SET is_active = ? WHERE id  = ?',[is_active,id])
}
module.exports = {
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
  updateUserRole,
  updateUserStatus,
};