import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import joi from 'joi';
import passwordComplexity from 'joi-password-complexity'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamps: true
});


userSchema.methods.generateAuthToken =function(){
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}

const User = mongoose.model('User' , userSchema);

const validate = (data)=>{
    const schema = joi.object({
        name:joi.string().required().label("Name"),
        email:joi.string().required().label("Email"),
        password:passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}



export  { User , validate } ;