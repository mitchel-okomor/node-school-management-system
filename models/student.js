const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    subject_class: String,
    date_of_birth: String,
    state_of_residence: String,
    state_of_origin: String,
    phone: { type: String, index: true, unique: true },
    address: String,
    email: { type: String, index: true, unique: true, required: true },
    password: String,
    image_url: String,
    role: { type: String, required: true, default: "student" },
  },
  { timestamps: true }
);

mongoose.model("student", studentSchema);
