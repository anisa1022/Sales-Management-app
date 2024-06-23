import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true,
    },
    phone:{
        type: String,
        required: true
    },
    address :{
        state:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true
        },
        district:{
            type: String,
            required: true
        }
    },
    purchaseHistory: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sale'
        }
    ]
},{
    timestamps : true  // Automatically adds createdAt and updatedAt fields
});

const Customer = mongoose.model('Customer' , customerSchema);
export default Customer;