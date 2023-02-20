const mongoose=require('mongoose')

const modelAdmin=mongoose.Schema({
    nameAdmin:{
        type:String,
        required:true,
    },
    emailAdmin:{
        type:String,
        required:true,
    },
    passwordAdmin:{
        type:String,
        required:true,
    },
})

module.exports=mongoose.model('admin',modelAdmin)