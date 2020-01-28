const config=require('config')
const jwt=require('jsonwebtoken')



function auth(req,res,next){
    const token=req.header('x-auth-token')

    //check for token
    if(!token){
       return res.status(401).json({message: 'No token, authorization denied'})
    }

    
    //If there's a token, verify it.
    try{
    const decoded=jwt.verify(token,config.get('jwtSecret'))
    //Add user from payload
    req.user=decoded;
    next();
    }
    catch(e){
        res.status(400).json({message:'Token is not valid'})
    }
}

module.exports=auth;