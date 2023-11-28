const mongoose=require('mongoose')

const qurySchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    msg:String,
    status:String
})


module.exports=mongoose.model('quarycontect',qurySchema)