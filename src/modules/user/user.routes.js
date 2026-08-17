const express = require("express")
const router = express.Router()
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteAccount,
  getAllUsers,
  changeUserRole,
  toggleUserStatus,
  deleteUser,
} = require("./user.controller")
const {authenticate} = require("../../middleware/auth.middleware")
const {authorize} = require("../../middleware/role.middleware")
const {updateProfileSchema,validate } = require("./user.validation")
const upload = require("../../middleware/upload.middleware")


// Customer Routes
router.get('/profile',authenticate,getProfile)
router.put('/profile',authenticate,validate(updateProfileSchema),updateProfile)
router.put('/profile/image',authenticate,upload.single('image'),uploadProfileImage)
router.delete('/profile',authenticate,deleteAccount)

// Admin Routes
router.get("/",authenticate,authorize("admin"),getAllUsers)
router.put('/:id/role',authenticate,authorize('admin'),changeUserRole)
router.put('/:id/status',authenticate,authorize("admin"),toggleUserStatus)
router.delete('/:id',authenticate,authorize("admin"),deleteUser)


module.exports = router;
