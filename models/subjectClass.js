const mongoose = require('mongoose');

const subjectClassSchema = new mongoose.Schema({
    title:  {type:String, required:true}
}, { timestamps: true });

mongoose.model("subject_class", subjectClassSchema);
