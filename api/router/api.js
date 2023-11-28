const router=require('express').Router()
const cApi= require('../controler/apiControler')
const multer = require('multer')
const parsJwt = require('../midilwares/parsJwt')

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload') 
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{files:1024*1024*6}
})

// Admin Part
router.get('/reg',cApi.adminReg)
router.post('/login',cApi.adminLogin)
router.post('/userregister',cApi.userregister)
  router.post('/userlogin',cApi.userlogin)

router.post('/addpopularprodect',upload.single('image'),cApi.addProdects)
router.get('/showpopularprodect' ,cApi.showProdects)
router.get('/showvalus/:id',cApi.showvalus)
router.put('/updatepopularprodect/:recordid',upload.single('image'),cApi.updateProdects)
router.delete('/deletepopularprodect/:id',cApi.deleteProdects)
router.get('/popularprodectstatus/:id',cApi.Prodectsstatus)
router.post('/prodectsearch',cApi.prodectsearch)
router.get('/findquery',cApi.findquery)
router.delete('/querydelte/:id',cApi.querydelte)
router.get('/quryfindbyid/:id',cApi.quryfindbyid)
router.post('/quryreply/:quaryid',cApi.quryreply)
router.get('/dashbord',cApi.dashbord)

// User Part
  
router.get('/frontshowpopularprodect',cApi.frontshowProdects)
router.post('/idsprodects',cApi.idsprodect)
router.get('/frontsaleonprodect',cApi.frontsaleonprodect)
router.get('/showbutshirts',cApi.showbutshirts)
router.get('/showwomentshirts',cApi.showwomentshirts)
router.get('/showmentshirts',cApi.showmentshirts)
router.post('/subscribers',cApi.subscribers)
router.get('/findsubriber',cApi.findsubriber)
router.post('/contectqury',cApi.contectqury)
router.get('/findusers',cApi.findusers)
router.post('/checkoutdetails',cApi.checkoutdetails)


module.exports = router