const pool = require("../../config/db")


// Find User by Email
const findUserByEmail = async (email)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email])
    return rows[0]||null
}

// finding user by phone number 
const findUserByPhone = async(phone)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE phone = ?',[phone])
    return rows[0]||null
}

// finding user by id 
const findUserById = async(id)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?',[id])
    return rows[0]||null
}

// creating user by phone or email
const createUser = async({name,email,phone,password_hash,role})=>{
    const [result] = await pool.query(
        'INSERT INTO users (name,email,phone,password_hash,role) VALUES (? ,? ,? ,? ,?)',
        [name,email||null,phone||null,password_hash||null,role||'customer']
    )
    return result.insertId
}

// make user verified
const markUserVerified = async(userId)=>{
    await pool.query("UPDATE users SET is_verified = TRUE WHERE id = ?",[userId])
}

// make the refresh token 
const saveRefreshToken = async({user_id,token,expires_at})=>{
    await pool.query('INSERT INTO refresh_tokens (user_id , token , expires_at) VALUES (?,?,?)',
        [user_id,token,expires_at]
    )
}


const findRefreshToken = async(token)=>{
    const [rows] = await pool.query(
        "SELECT * FROM refresh_tokens WHERE token = ?",
        [token]
    )
    return rows[0]||null
}

const deleteRefreshToken = async (token) => {
  await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
};

const deleteAllRefreshTokens = async (user_id) => {
  await pool.query('DELETE FROM refresh_tokens WHERE user_id = ?', [user_id]);
};

module.exports = {
  findUserByEmail,
  findUserByPhone,
  findUserById,
  createUser,
  markUserVerified,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokens,
};