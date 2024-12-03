import jwt from "jsonwebtoken"

const accessToken = (user)=>{
    return jwt.sign({email:user.email},process.env.ACCESS_TOKEN,{expiresIn :'6h'})
}
const refreshToken = (user)=>{
    return jwt.sign({email:user.email},process.env.REFRESH_TOKEN,{expiresIn: '7d'})
}