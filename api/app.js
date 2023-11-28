const express=require('express')
const app=express()
const mongoose=require('mongoose')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/ShopingCart')
const apiRouter=require('./router/api')


app.use(apiRouter)
app.listen(5000,()=>{
    console.log("server is running on 5000")
})
