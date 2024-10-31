// app/controllers/UserControllers.js
import UsersModel from "../model/UserModel.js"; // Make sure this import path is correct
import { TokenEncode } from "../utility/tokenutility.js";
import { SendEmail } from "../utility/emailutility.js"



export const Registration = async (req, res) => {
    try {
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        return res.json({ status: "success", message: "User Registration successful" });
    }
    catch (e) {
        return res.json({ status: "error", message: e.toString() });
    }
};

export const Login = async (req, res) => {
    try {
        let reqBody = req.body;
        let data =await UsersModel.findOne(reqBody);
        if(data==null){  
            return res.json({ status: "success", message: "User  Not found" });
        }
        else{
            let token= TokenEncode(data['email'],data['_id'])
            return res.json({ status: "success", message: "User  successful Login" ,token:token});
        }
        
    }
    catch (e) {
        return res.json({ status: "error", message: e.toString() });
    }
};

export const ProfileDetails = async (req, res) => {
    try{
        let user_id = req.headers['user_id']
        let data =await UsersModel.findOne({"id":user_id})
        return res.json({ status: "success", message: "User Profile details Sucessfull",data:data });
    }
    catch(e){
        return res.json({ status: "fail", message: e.toString() });
    }
};




export const ProfileUpdate = async (req, res) => {
    try {
        let reqBody = req.body;
        let user_id = req.headers['user_id']
        let data =await UsersModel.updateOne({"_id":user_id},reqBody)
        return res.json({ status: "success", message: "User Update successful" ,data:data});
    }
    catch (e) {
        return res.json({ status: "error", message: e.toString() });
    }
};

export const EmailVerity = async (req, res) => {

  try{
    let email=req.params.email;
    let data = await UsersModel.findOne({email:email})
    if(data==null){
        return res.json({ status: "fail", message: "user email does not exist" });
    }
    else{
        //--- send otp to email
        let code=Math.floor(100000+Math.random()*900000);
        let EmailTo=data['email']
        let EmailText= "Your code is "+code;
        let EmailSubject="Task Api verification code"
        await SendEmail(EmailTo,EmailText,EmailSubject)

        //---update otp in user
        await UsersModel.updateOne({email:email},{otp:code})
        return res.json({ status: "success", message: "Email verification successful" });
    }
  }
  catch(e){
    return res.json({ status: "fail", message: e.toString() });
  }
    
};

export const CodeVerity = async (req, res) => {

    try{
        let reqBody =req.body;
        let data =await UsersModel.findOne({email:reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return res.json({ status: "fail", message: "wrong verification code" });
        }
        else{
            return res.json({ status: "success", message: "Code verification successful" });
            }
    }

    catch(e){
        return res.json({ status: "success", message:e.toString() });
    }
  
    
};

export const ResetePassword = async (req, res) => {
    try{
        let reqBody =req.body;
        let data =await UsersModel.findOne({email:reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return res.json({ status: "fail", message: "wrong verification code" });
        }
        else{
            let data =await UsersModel.updateOne({email:reqBody['email']},
            {
              otp:"0",
              password:reqBody['password'],
            }
        )
        return res.json({ status: "success", message: "Password reset successful" });
        }
    }

    catch(e){
        return res.json({ status: "success", message:e.toString() });
    }
};
