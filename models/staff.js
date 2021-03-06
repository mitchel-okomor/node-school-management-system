const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, index: true, unique: true },
  address: String,
  state_of_origin: String,
  date_of_birth: String,
  subject: Array,
  salary: Number,
  email: { type: String, index: true, unique: true, required: true },
  category: { type: String, required: true },
  password: { type: String, required: true },
  image_url: String,
  role: { type: String, required: true, default: "staff" },
  is_admin: false,
});

mongoose.model("staff", staffSchema);
