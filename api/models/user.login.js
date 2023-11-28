const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    number: String
},)




module.exports = mongoose.model('UserReg',regSchema)