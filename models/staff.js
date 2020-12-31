const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    firstname:  {type:String, required:true},
    lastname:  {type:String,required:true},
    phone: String,
    address: String,
    "state_of_origin": String,
    "date_of_birth": String,
    subject: String,
    salary: Number,
    email:  {type:String, index:true, unique:true, required:true},
    category: {type:String,required:true},
    password: {type:String, required:true},
    image_url: String
});

mongoose.model("staff", staffSchema);
