import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
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

// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await hasBrowserCrypto.gensalt(10); //This generates a salt with a cost factor of 10. A salt is a random value added to the password before hashing to ensure that even identical passwords hash to different values.
//     this.password=  await bcrypt.hash(this.password , salt)
// });

// // Matchpassword compares plain text password with hashed password
// userSchema.methods.matchPassword= async function (enterPassword){
//     return await bcrypt.compare(enterPassword , this.password);
// }

const User = mongoose.model('User' , userSchema);
export default User;