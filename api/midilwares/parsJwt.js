const JWT =require('jsonwebtoken')
const secret = "#123%%^^^ABCD";


exports.JwtMidilware=(req,res ,next)=>{
    try{
    const token = req.headers.toekn || null
    const jwtResp = JWT.verify(token, secret);
    if(jwtResp){
        next()
    }
    else{
        res.send({err:"invalid user"})
    }
    }
    catch(err){
     res.send({err:"invailid user"})
    }
}