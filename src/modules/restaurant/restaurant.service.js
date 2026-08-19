const restaurantRespository = require("./restaurant.repository")
const ApiError = require("../../utils/ApiError")
const uploadToCloudinary = require("../../utils/uploadToCloudinary")
const cloudinary = require("../../config/cloudinary")

const createRestaurant = async(ownerId,data)=>{
    const existing = await restaurantRespository.findRestaurantByOwner(ownerId)
    if(existing) throw new ApiError(409,"You already have a restaurant")

    const restaurantId = await restaurantRespository.createRestaurant({owner_id:ownerId,...data})
    return await restaurantRespository.findRestaurantById(restaurantId)
    }

const getRestaurantById = async(id)=>{
    const  restaurant = await restaurantRespository.findRestaurantById(id)
    if(!restaurant) throw new ApiError(404,"Restaurant not found")
    return restaurant
}

const getAllRestaurants = async(query)=>{
    const page = parseInt(query.page)||1
    const limit = parseInt(query.limit)||10
    const {city,is_open,search} = query

    return await restaurantRespository.findAllRestaurants({
    city,
    is_open: is_open !== undefined ? is_open === 'true' : undefined,
    search,
    page,
    limit,
  });
}

const updateRestaurant  = async(ownerId,data)=>{
    const restaurant = await restaurantRespository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not found")

    await restaurantRespository.updateRestaurant(restaurant.id,data)
    return restaurantRespository.findRestaurantById(restaurant.id)
}

const uploadRestaurantImage = async(ownerId,file)=>{
    if(!file) throw new ApiError(400,"No image Provided")
    
    const restaurant = await restaurantRespository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not found")
    
    if(restaurant.image){
        const publicId = restaurant.image.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`food-delivery/restaurants/${publicId}`)
    }
    const result = await uploadToCloudinary(file,'food-delivery/restaurants')
    await restaurantRespository.updateRestaurant(restaurant.id,{image:result.secure_url})

    return await restaurantRespository.findRestaurantById(restaurant.id)
}

const toggleStatus = async(ownerId)=>{
    const restaurant = await restaurantRespository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not found")
    
    if(!restaurant.is_approved) throw new ApiError(403,"resturant not approved yet")

    await restaurantRespository.toggleRestaurantStatus(restaurant.id,!restaurant.is_open)

    return {message:`Restaurant is now ${!restaurant.is_open ? 'open' : 'closed'}`}
}

const deleteRestaurant = async(ownerId)=>{
    const resturant = await restaurantRespository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not Found")

    await restaurantRespository.deleteRestaurant(resturant.id)

    return {message:"Restaurant delete SuccessFully"}
}

// Admin
const getAllRestaurantForAdmin = async()=>{
    return await restaurantRespository.findAllRestaurantsForAdmin()
}

const approveRestaurant = async (id) => {
  const restaurant = await  restaurantRespository.findRestaurantById(id);
  if (!restaurant) throw new ApiError(404, 'Restaurant not found');
  if (restaurant.is_approved) throw new ApiError(409, 'Restaurant already approved');

  await restaurantRespository.approveRestaurant(id);

  return { message: 'Restaurant approved successfully' };
};

const adminDeleteRestaurant = async (id) => {
  const restaurant = await restaurantRepository.findRestaurantById(id);
  if (!restaurant) throw new ApiError(404, 'Restaurant not found');

  await restaurantRepository.deleteRestaurant(id);

  return { message: 'Restaurant deleted successfully' };
}


module.exports = {
    createRestaurant,
    getRestaurantById,
    getAllRestaurants,
    updateRestaurant,
    uploadRestaurantImage,
    toggleStatus,
    deleteRestaurant,
    getAllRestaurantForAdmin,
    adminDeleteRestaurant,
    approveRestaurant
}