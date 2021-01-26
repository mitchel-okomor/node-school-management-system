const mongoose = require("mongoose");
require("../models/subjectClass");

const SubjectClass = mongoose.model("subject_class");

const subjectClassObj = {
  create: (req, res) => {
    console.log(req.body);
    const { title, tution } = req.body;

    const subjectClass = new SubjectClass({
      title,
      tution,
    });

    subjectClass
      .save()
      .then((data) => {
        console.log(data);
        res.json({ message: "success", data });
      })
      .catch((err) => {
        res.json({ message: "success", data });

        console.log(err);
      });
  },

  getOne: (req, res) => {
    console.log(req.params.id);
    SubjectClass.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    SubjectClass.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteOne: (req, res) => {
    SubjectClass.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateOne: (req, res) => {
    console.log(req.body);
    SubjectClass.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      tution: req.body.tution,
    })
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = subjectClassObj;
