const addressRepository = require('./address.repository')
const ApiError = require("../../utils/ApiError")

const  createAddress = async(userId ,data)=>{
  if(data.is_default){
    await addressRepository.unsetDefaultAddress(userId)
  }

  const addressId = await addressRepository.createAddress({user_id:userId,...data})

  return {id:addressId,...data }

}

const getAllAddresses = async(userId)=>{
  return await addressRepository.findAllAddressesByUser(userId)
}


const updateAddress = async(userId,addressId,data)=>{
   const address = await addressRepository.findAddressByIdAndUser(addressId,userId)
   if(!address) throw new ApiError(404,"Address not found")

   if(data.is_default){
    await addressRepository.unsetDefaultAddress(userId)
   }
   await addressRepository.updateAddress(addressId,data)

   return await addressRepository.findAddressByIdAndUser(addressId,userId)
}

const deleteAddress = async(userId,addressId)=>{
  const address = await addressRepository.findAddressByIdAndUser(addressId,userId)
  if(!address) throw new ApiError(404,"Address not found")

  await addressRepository.deleteAddress(addressId,userId)
  return {message:"Address Deleted successfully"}
}

const setDefaultAddress = async(addressId,userId)=>{
  const address = await addressRepository.findAddressByIdAndUser(addressId,userId)
  if(!address) throw new ApiError(404,"Address not found")

  await addressRepository.unsetDefaultAddress(userId)
  await addressRepository.setDefaultAddress(addressId,userId)
  
  return { message: 'Default address updated successfully' };

}

module.exports = {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};