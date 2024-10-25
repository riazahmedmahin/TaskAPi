// app/controllers/UserControllers.js
import UsersModel from "../model/UserModel.js"; // Make sure this import path is correct
import { TokenEncode } from "../utility/tokenutility.js";

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
        await UsersModel.updateOne({"_id":user_id},reqBody)
        return res.json({ status: "success", message: "User Update successful" });
    }
    catch (e) {
        return res.json({ status: "error", message: e.toString() });
    }
};

export const EmailVerity = async (req, res) => {
    return res.json({ status: "success", message: "Email verification successful" });
};

export const CodeVerity = async (req, res) => {
    return res.json({ status: "success", message: "Code verification successful" });
};

export const ResetePassword = async (req, res) => {
    return res.json({ status: "success", message: "Password reset successful" });
};
