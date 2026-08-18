const express = require("express")
const router = express.Router()
const {authenticate} = require("../../middleware/auth.middleware")
const {createAddressSchema,updateAddressSchema,validate} = require("./address.validation")
const addressController = require("./address.controller")

router.get('/', authenticate, addressController.getAllAddresses);
router.post('/', authenticate, validate(createAddressSchema), addressController.createAddress);
router.put('/:id', authenticate, validate(updateAddressSchema), addressController.updateAddress);
router.delete('/:id', authenticate, addressController.deleteAddress);
router.patch('/:id/default', authenticate, addressController.setDefaultAddress);

module.exports = router