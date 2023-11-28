const mongoose=require('mongoose')

const saleSchema=mongoose.Schema({
    image:String,
    name:String,
    gender:String,
    price:String,
    status:String
})




module.exports = mongoose.model('addsaleonprodect',saleSchema)