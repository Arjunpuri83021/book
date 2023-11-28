const mongoose=require('mongoose')

const subSchema=mongoose.Schema({
   subscribers:String
})




module.exports = mongoose.model('subsriber',subSchema)