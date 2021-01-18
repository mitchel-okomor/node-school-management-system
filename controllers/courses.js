const mongoose = require('mongoose');
require('../models/course');

const Course = mongoose.model("course");

const courseObj ={

    create: (req, res) => {
        console.log(req.body)
        const {
          title
          
        } = req.body;
    
        const course = new Course({
      title });
    
        course
          .save()
          .then((data) => {
            console.log(data);
            res.json({ message: "success", data });
          })
          .catch((err) => {
            console.log(err);
          });
      },

     getOne: (req, res)=>{
       console.log(req.params.id)
        Course.findById(req.params.id).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },


      getAll: (req, res)=>{
        Course.find({}).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    deleteOne: (req,res)=>{
        Course.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
updateOne: (req, res)=>{
  console.log(req.body)
        Course.findByIdAndUpdate(req.params.id, {
        title: req.body.title        
        }).
        then(data=>{
          console.log(data);
          res.status(200).send(data);
        }).catch(err=>{
          console.log(err);
        })
      },

}


module.exports = courseObj;
