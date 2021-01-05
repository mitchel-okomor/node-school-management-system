const mongoose = require('mongoose');
require('../models/info');

const Info = mongoose.model("info");

const infoObj ={

    create: (req, res) => {
        console.log(req.body)
        const {
          title,
          description,
          
        } = req.body;
    
        const info = new Info({
      title,
      description
        });
    
        info
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
        Info.findById(req.params.id).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },


      getAll: (req, res)=>{
        Info.find({}).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    deleteOne: (req,res)=>{
        Info.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
updateOne: (req, res)=>{
  console.log(req.body)
        Info.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
          description: req.body.description,
        
        }).
        then(data=>{
          console.log(data);
          res.status(200).send(data);
        }).catch(err=>{
          console.log(err);
        })
      },

}


module.exports = infoObj;
