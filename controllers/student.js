const mongoose = require("mongoose");
require("../models/student");

const Student = mongoose.model("student");

const student = {
  create: (req, res) => {
    const {
      firstname,
      lastname,
      subject_class,
      date_of_birth,
      address,
      state_of_residence,
      state_of_origin,
      email,
      password,
      phone,
    } = req.body;
    console.log("student: "+ firstname)

    const student = new Student({
      firstname,
      lastname,
      subject_class,
      date_of_birth,
      state_of_residence,
      state_of_origin,
      phone,
      address,
      email,
      password,
      image_url: req.file.filename,
    });

    student
      .save()
      .then((data) => {
        console.log(data);
        res.json({ message: "success", data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getOne: (req, res) => {
    Student.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    Student.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteOne: (req, res) => {
    Student.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateOne: (req, res) => {
    const {
      firstname,
      lastname,
      address,
      date_of_birth,
      state_of_residence,
      state_of_origin,
      email,
      phone,
    } = req.body;

    Student.findByIdAndUpdate(req.params.id, {
      firstname,
      lastname,
      address,
      date_of_birth,
      state_of_residence,
      state_of_origin,
      email,
      phone,
    })
      .then((data) => {
        console.log(data);
        res.send("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = student;
