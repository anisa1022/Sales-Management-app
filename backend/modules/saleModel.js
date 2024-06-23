import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    totalPrice:{
        type:Number ,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
},
{
    timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;