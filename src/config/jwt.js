import jwt from 'jsonwebtoken';






export const createToken = (data)=>{
return jwt.sign(data,"BI_MAT",{expiresIn:"5m"});

}
export const  checkToken = (token)=>{
return jwt.verify(token,"BI_MAT",(error)=>{
    return error;
})
}
export const decodeToken = (token)=>{
    return jwt.decode(token);
}
export const middleToken = (req,res,next) =>{
    let {token} = req.headers;
    if(checkToken(token)==null){
    next()
    }else{
    res.status(401).send("not authorization")
    }
}