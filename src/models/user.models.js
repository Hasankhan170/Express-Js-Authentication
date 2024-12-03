import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new  mongoose.Schema({
    email : {
        type :String,
        require : [true, "email is required"],
        unique  : true
    },
    password : {
        type : String,
        require : [true, "password is required"],
    }
})

UserSchema.pre("save", function(next){
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()    
})

export default mongoose.model("User", UserSchema)