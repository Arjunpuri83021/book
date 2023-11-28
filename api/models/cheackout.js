const mongoose=require('mongoose')

const Cheackout=mongoose.Schema({
    
    info: String,
    fname: String,
    lname: String,
    country: String,
    street: String,
    apartment: String,
    city: String,
    state: String,
    zip: String,
    pnumber: String,
    Payment: String,

    image:String,
    name:String,
    gender:String,
    price:String,
    
})


module.exports=mongoose.model('cheackout',Cheackout)