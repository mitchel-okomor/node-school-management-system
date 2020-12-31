const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    eventId: String,  
    userId: String,
    orderId: String,
    quantity: String,
    isPaid: {type:String, default:false},
}, { timestamps: true });

mongoose.model("order", orderSchema);
