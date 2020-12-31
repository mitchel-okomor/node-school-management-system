const mongoose = require('mongoose');
require('../models/staff');

const Staff = mongoose.model("staff");

const user ={

     getOne: (req, res)=>{
        User.findById(req.params.id).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },


      getAll: (req, res)=>{
        User.find({}).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    deleteOne: (req,res)=>{
        User.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
updateOne: (req, res)=>{
  console.log(req.body)
        User.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          picture: req.body.picture,
        }).
        then(data=>{
          console.log(data);
          res.send("Updated");
        }).catch(err=>{
          console.log(err);
        })
      },

}


module.exports = user;
