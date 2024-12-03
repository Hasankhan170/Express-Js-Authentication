import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
import bcrypt from "bcrypt"


const accessToken = (user)=>{
    return jwt.sign({email:user.email},process.env.ACCESS_TOKEN,{expiresIn :'6h'})
}
const refreshToken = (user)=>{
    return jwt.sign({email:user.email},process.env.REFRESH_TOKEN,{expiresIn: '7d'})
}

// registerUser
const registerUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
    if(!email) return res.status(400).json({message : "email is required"})
    if(!password) return res.status(400).json({message : "password is required"})

    const user = await User.findOne({email:email})   
    if(user) return res.status(401).json({message : "user already exists"})

    const UserCreate = await User.create({
        email,
        password
    })    

    res.status(201).json({
        message : "user registered successfully",
        data: UserCreate
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }

}


//loginUser
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    if(!email) return res.status(404).json({message:"email is required"});
    if(!password) return res.status(404).json({message:"password is required"});
    const user = await User.findOne({email:email})
    if(!user) return res.status(404).json({message: "no user found"});
    const validPassword = bcrypt.compare(password,user.password)
    if(!validPassword) return res.status(404).json({message : "password mismatch"})

    const actoken =  accessToken(user)

    res.status(200).json({
        message: "user login successfully"  ,
        actoken,
        data : user 
    })
}


export {registerUser,loginUser}