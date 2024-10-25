import { TokenDecode } from "../utility/tokenutility.js"
export default  (req,res,next)=>{
    let token =req.headers['token']
    let decoded = TokenDecode(token)

    if(decoded==null){
        res.status(401).json({status:"fail",message:"Unauthorized"})
    }
    else{
        let email =decoded.email;
        let user_id= decoded.user_id;
        req.header.email=email;
        req.header.user_id=user_id;
        next()
    }

}