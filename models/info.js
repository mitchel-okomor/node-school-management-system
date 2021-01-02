const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    title:  {type:String, required:true},
    description:  {type:String,required:true},
}, { timestamps: true });

mongoose.model("info", infoSchema);
