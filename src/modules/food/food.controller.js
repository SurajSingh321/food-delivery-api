const foodService = require("./food.service")
const {successResponse} = require("../../utils/response")

const createFood = async(req , res ,next)=>{
    try{
        const food = await foodService.createFood(req.user.id,req.body)
        successResponse(res ,200 ,"Food item created successfully",food)

    }catch(err){
        next(err)
    }
}

const getFoodsByRestaurant = async(req,res,next)=>{
    try{
        const food = await foodService.getFoodsByRestaurant(req.params.restaurantId,req.query)
        successResponse(res,200,"Food items fetched Succesfully",food)

    }catch(err){
        next(err)
    }
}

const getFoodById = async(req,res,next)=>{
    try{
        const food  = await foodService.getFoodById(req.params.id)
        successResponse(res, 200, 'Food item fetched successfully', food)
    }catch(err){
        next(err)
    }
}

const updateFood = async(req,res,next)=>{
    try{
        const food = await foodService.updateFood(req.user.id, req.params.id, req.body)
        successResponse(res, 200, 'Food item updated successfully', food)
    }catch(err){
        next(err)
    }
}
const uploadFoodImage = async(req,res,next)=>{
    try{
        const food = await foodService.uploadFoodImage(req.user.id,req.params.id,req.file)
        successResponse(res, 200, 'Food image uploaded successfully', food)

    }catch(err){
        next(err)
    }
}

const deleteFood = async(req,res,next)=>{
    try{
        const food = await foodService.deleteFood(req.user.id,req.params.id)
        successResponse(res, 200, result.message)

    }catch(err){
        next(err)
    }

}
module.exports = {
  createFood,
  getFoodsByRestaurant,
  getFoodById,
  updateFood,
  uploadFoodImage,
  deleteFood,
}