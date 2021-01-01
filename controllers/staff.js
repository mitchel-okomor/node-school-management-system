const mongoose = require('mongoose');
require('../models/staff');

const Staff = mongoose.model("staff");

const staffObj ={

     getOne: (req, res)=>{
       console.log(req.params.id)
        Staff.findById(req.params.id).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },


      getAll: (req, res)=>{
        Staff.find({}).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    deleteOne: (req,res)=>{
        Staff.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
updateOne: (req, res)=>{
  console.log(req.body)
        Staff.findByIdAndUpdate(req.params.id, {
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


module.exports = staffObj;
