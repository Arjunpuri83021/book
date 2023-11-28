const Reg=require('../models/super.admin.reg')
const bcrypt=require('bcrypt')
const Prodects=require('../models/Prodects')
const Subscriber=require('../models/subscriber')
const Quary=require('../models/quary')
const nodemailer =require('nodemailer')
const Cheackout= require('../models/cheackout')
const UserLogin=require('../models/user.login')



exports.dashbord = async(req,res,next)=>{
   try{
   const totalprodect = await Prodects.count()
   const totalsubscriber = await Subscriber.count()
   const totalquary = await Quary.count()
   res.json({totalprodect,totalsubscriber,totalquary})
   
}catch(err){
   console.log(`error in admin dashbord ${err}`)
  }

}


exports.adminReg=async(req,res)=>{
   try{
    let a = '123'
   const convertedPassword= await bcrypt.hash(a,10)
 const record= new Reg({username:"admin",password:convertedPassword})
 await record.save()
 res.send("login")
 //console.log(record)
}catch(err){
   console.log(`error in adminReg ${err}`)
}
}

exports.adminLogin=async(req,res)=>{
   try{
    const {username,password}=req.body
   const record= await Reg.findOne({username:username})
   //console.log(record)
   if(record!==null){ 
    if(record.password==password){
    res.json(record)
    
}else{
    res.json({message:"wrong password"})
}
   }
   else{
    res.json({message:"Wrong username"})
   }

} catch(err){
   console.log(`error in AdminLogin ${err}`)
}
}


exports.addProdects=async(req,res)=>{
   try{
    // console.log(req.file.filename)
    // console.log(req.body)
    const {page,gender,name,price}=req.body
    const img=req.file.filename
    const record= new Prodects({page:page,image:img,gender:gender,name:name,price:price,status:"publish"})
    await record.save()
    //console.log(record)
    res.json(record)
   }catch(err){
      console.log(`error in Addprodects ${err}`)
   }
   }
    


exports.showProdects=async(req,res)=>{
   try{
   let record= await Prodects.find()
   const totalservices= await Prodects.count()
   const totalpopular= await Prodects.count({page:"Popular-t-shirts"})
   const totalonsale= await Prodects.count({page:"On-sale-t-shirt"})
   const totalwomen= await Prodects.count({page:"Women"})
   const totalmen = await Prodects.count({page:"Men"})

   res.json({record,totalservices,totalpopular,totalonsale,totalwomen,totalmen})

}catch(err){
   console.log(`error in ShowProdects ${err}`)
}
}

exports.frontshowProdects=async(req,res)=>{
   try{
    const record= await Prodects.find({status:"publish",page:"Popular-t-shirts"})
    res.json(record)
   }catch(err){
      console.log(`error in FrontShowProdects ${err}`)
   }
}


exports.Prodectsstatus=async(req,res)=>{
   try{
    const id=req.params.id
   const record= await Prodects.findById(id)
   //console.log(record)
   let newstatus=null
   if(record.status=='unpublish'){
    newstatus='publish'
   }
   else{
    newstatus='unpublish'
   }
  const newstatusrecord= await Prodects.findByIdAndUpdate(id,{status:newstatus})
   res.json(newstatusrecord)
}catch(err){
   console.log(`error in ProdectStatus ${err}`)
}
}




exports.showvalus=async(req,res)=>{
   try{
    const id=req.params.id
   const record= await Prodects.findById(id)
   res.json(record)
}catch(err){
   console.log(`error in showvalus ${err}`)
}
}

exports.updateProdects=async(req,res)=>{
    // console.log(req.params.recordid)
    try{
       const id= req.params.recordid
   
   const {gender,name,price}=req.body
if(req.file!==undefined){
   await Prodects.findByIdAndUpdate(id,{image:req.file.filename,
    name:name,
    gender:gender,
    price:price})
    
}else{
    await Prodects.findByIdAndUpdate(id,{image:img,
        name:name,
        gender:gender,
        price:price})
}
res.json({message:"succfuly updated"})
}catch(err){
   console.log(`error in UpdateProdects ${err}`)
}
}


exports.deleteProdects=async(req,res)=>{
   try{
   const id= req.params.id
    await Prodects.findByIdAndDelete(id)
    res.json({message:"succfuly deleted"})
   }catch(err){
      console.log(`error in deleteProdects ${err}`)
   }
}


exports.idsprodect= async(req,res)=>{
   try{
    const ids=req.body.ids
    const record=await Prodects.find({_id:{$in:ids}}) // next add to card 10
    res.json(record)
   }catch(err){
      console.log(`error in idsprodect ${err}`)
   }
  }


  
exports.frontsaleonprodect=async(req,res)=>{
   try{
    const record= await Prodects.find({status:"publish",page:"On-sale-t-shirt"})
    res.json(record)
   }catch(err){
      console.log(`error in frontsaleonprodect ${err}`)
   }
 }

 exports.prodectsearch=async(req,res)=>{
   try{
     const {search}=req.body
   const record= await Prodects.find({page:search})
   const totalservices= await Prodects.count()
   const totalpopular= await Prodects.count({page:"Popular-t-shirts"})
   const totalonsale= await Prodects.count({page:"On-sale-t-shirt"})
const totalwomen= await Prodects.count({page:"Women"})
   const totalmen = await Prodects.count({page:"Men"})
 res.json({record,totalservices,totalpopular,totalonsale,totalwomen,totalmen})
    //console.log(record)
   }catch(err){
      console.log(`error in prodectsearch ${err}`)
   }
 }

 exports.showbutshirts=async(req,res)=>{
   try{
   const record= await Prodects.find()
 const totalrecord= await Prodects.count()
 res.json({record,totalrecord})
}catch(err){
   console.log(`error in showbuyteshirt ${err}`)
}
 }

 exports.showwomentshirts=async(req,res)=>{
   try{
    const record= await Prodects.find({gender:"for-women"})
 const totalrecord= await Prodects.count({gender:"for-women"})
 res.json({record,totalrecord})
}catch(err){
   console.log(`error in showWomenTshirts ${err}`)
}
 //console.log(record)
 }

 exports.showmentshirts=async(req,res)=>{
   try{
    const record= await Prodects.find({gender:"for-men"})
 const totalrecord= await Prodects.count({gender:"for-men"})
 res.json({record,totalrecord})
}catch(err){
   console.log(`error in showMenTshirts ${err}`)
}
 }

 exports.subscribers=async(req,res)=>{
   try{
    const {subscribe}=req.body
    const record =new Subscriber({subscribers:subscribe})
   await record.save()
//    console.log(record)
res.json(record)
}catch(err){
   console.log(`error in subscribers ${err}`)
}
 }

 exports.findsubriber=async(req,res)=>{
   try{
   const record= await Subscriber.find()
   res.json(record)
}catch(err){
   console.log(`error in findsubscriber ${err}`)
}
 }
 

 exports.contectqury=async(req,res)=>{
   try{
   const {fname,lname,email,msg}=req.body
  const record= new Quary({fname:fname,lname:lname,email:email,msg:msg,status:"Unread"})
 await record.save()
 res.json(record)
}catch(err){
   console.log(`error in conetctquary ${err}`)
}

 }

 exports.findquery=async(req,res)=>{
   try{
  const record= await Quary.find()
  const totalquary = await Quary.count()
  const totalread= await Quary.count({status:"read"})
  const totalunread= await Quary.count({status:"Unread"})
   res.json({record,totalquary,totalread,totalunread})
}catch(err){
   console.log(`error in findquearys ${err}`)
}
 }

 exports.querydelte=async(req,res)=>{
   try{
   const id=req.params.id
  const record= await Quary.findByIdAndDelete(id)
  res.json({message:"successfully deleted"})
}catch(err){
   console.log(`error in quarydelete ${err}`)
}
 }


 exports.quryfindbyid=async(req,res)=>{
   try{
   const id=req.params.id
  const record= await Quary.findById(id)
  res.json(record)
}catch(err){
   console.log(`error in quaryfindbyid ${err}`)
}
 }

 exports.quryreply=async(req,res)=>{
   try{
    const id=req.params.quaryid
    const {useremail,usermsg,adminreply}=req.body

    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'thevirus991@gmail.com', // generated ethereal user
        pass: "ibhiehyudevbrxpl", // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: 'thevirus991@gmail.com', // sender address
      to: useremail, // list of receivers
      subject: usermsg, // Subject line
      text: adminreply, // plain text body
    });
   
    await Quary.findByIdAndUpdate(id,{status:"read"})
    res.json({message:"replayed"})
   }catch(err){
      console.log(`error in quaryreply ${err}`)
   }
    
 }


 exports.checkoutdetails =async(req,res)=>{
   try{
   const {info,fname,lname,country,street,apartment,city,state,
      zip,pnumber,Payment,image,name, gender,price}=req.body
   // console.log(req.body)

     const record= new Cheackout({
      info:info,
      fname:fname,
      lname:lname,
      country:country,
      street:street,
      apartment:apartment,
      city:city,
      state:state,
      zip:zip,
      pnumber:pnumber,
      Payment:Payment,
  
      image:image,
      name:name,
      gender:gender,
      price:price})
   
     await record.save()
     console.log(record)
     res.json(record)
   }catch(err){
      console.log(`error in cheackoutdetails ${err}`)
   }
 }

 exports.userregister = async(req,res,next)=>{
   try{
   const {fname,lname,email,password,number}=req.body
  const User= await UserLogin.create({
      fname:fname,
      lname:lname,
      email:email,
      password:password,
      number:number
   })
await User.save()
// console.log(User)
res.json(User)
}catch(err){
   res.send("error in userRegister",err)
}

 }

 exports.userlogin =async(req,res,next)=>{
   try{
   const {email,password}=req.body
  const record= await UserLogin.findOne({email:email})
//   console.log(record)
if(record!==null){
   res.json(record)
}
else{
   res.json({message:"User Not Founded Please Register First"})
}

}catch(err){
   res.send("error in UserLogin",err)
} 
}

exports.findusers = async(req,res,next)=>{
   try{
   const record = await UserLogin.find()
   res.json(record)
}catch(err){
   res.send("error in userfind",err)
}
}