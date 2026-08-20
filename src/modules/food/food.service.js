const foodRespository = require("./food.repository")
const uploadTocloudinary = require("../../utils/uploadToCloudinary")
const restaurantRepository = require('../restaurant/restaurant.repository')
const cloudinary = require("../../config/cloudinary")
const ApiError = require("../../utils/ApiError")

const createFood = async(ownerId,data)=>{
    const restaurant = await restaurantRepository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not Found")
    if(!restaurant.is_approved) throw new ApiError(403,"Restaurant is not approved yet")
    
    const foodId = await foodRespository.createFood({
        restaurant_id:restaurant.id,
        ...data
    })
    return await foodRespository.findFoodById(foodId)
}

const getFoodsByRestaurant = async(restaurantId,query)=>{
    const page = parseInt(query.page)||1
    const limit = parseInt(query.limit)||10
    const {category_id,search} = query

    return await foodRespository.findFoodsByRestaurant(restaurantId,{
        category_id,
         search, 
         page, 
         limit
    })
}

const getFoodById = async(id)=>{
    const food  = await foodRespository.findFoodById(id)
    if(!food) throw new ApiError(404,"Food not Found")
    return food
}

const updateFood = async(ownerId,foodId,data)=>{
    const restaurant = await restaurantRepository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not Found")
    
    const food = await foodRespository.findFoodById(foodId)
    if(!food) throw new ApiError(404,"Food item not found")
    
    if(food.restaurant_id !== restaurant.id) throw new ApiError(403,"You are not authorized to update this food item")
    
    await foodRespository.updateFood(foodId,data)
    return await foodRespository.findFoodById(foodId)
}

const uploadFoodImage = async(ownerId,foodId,file)=>{
    const restaurant = await restaurantRepository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not Found")

    const food = await foodRespository.findFoodById(foodId)
    if(!food) throw new ApiError(404,"Food item not found")
    
    if(food.restaurant_id !== restaurant.id) throw new ApiError(403,"You are not authorized")
    
    if(food.image){
        const publicId = food.image.split("/").pop().split(".")[0]
        await cloudinary.uploader.destroy(`food-delivery/foods/${publicId}`)
    }
    const result = await uploadTocloudinary(file,'food-delivery/foods')
    await foodRespository.updateFood(foodId,{image:result.secure_url})
    
    return await foodRespository.findFoodById(foodId)
}
const deleteFood = async(ownerId,foodId)=>{
    const restaurant = await restaurantRepository.findRestaurantByOwner(ownerId)
    if(!restaurant) throw new ApiError(404,"Restaurant not found")
    
    const food = await foodRespository.findFoodById(foodId)
    if(!food) throw new ApiError(404,"Food item not Found")

    await foodRespository.deleteFood(foodId)
    return {message:"Food item deleted successfully"}
}

module.exports = {
  createFood,
  getFoodsByRestaurant,
  getFoodById,
  updateFood,
  uploadFoodImage,
  deleteFood,
}