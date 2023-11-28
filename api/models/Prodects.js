const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    page:String,
    image:String,
    name:String,
    gender:String,
    price:String,
    status:String
})




module.exports = mongoose.model('addpopularprodec',regSchema)