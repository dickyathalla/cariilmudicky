const mongoose=require('mongoose')

const courseCategoriesModel=mongoose.Schema({
    nameCategory:{
        type:String,
    }
})
module.exports = mongoose.model("courseCategories", courseCategoriesModel);