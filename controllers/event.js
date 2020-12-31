const mongoose = require('mongoose');
require('../models/event');

const Event = mongoose.model("event");

const event ={


  create: (req,res)=>{

    console.log("Creating event")
    const {title,
            event_type,
            description,
            venue,
            date,
            time,
            price,
            userId
    
    } = req.body
        const event = new Event({
         title,
         event_type,
         description,
         venue,
         date,
         time,
         price,
         userId,
         image: req.file.filename
        })

        event.save()
        .then(data=>{
          console.log(data);
          res.json({message:"success",
      data});
        }).catch(err=>{
          console.log(err);
        })
      },
      

     get: (req, res, id)=>{
        Event.findById(req.params.id).then(
          data=>{
            res.json(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

      getUserEvents:(req, res)=>{
        Event.find({"userId": req.params.id}, {}).then(
          data=>{
            console.log(data)
            res.json(data)
          }
        ).catch(err=>{
          console.log(err);
        }) 
      },

      getAll: (req, res)=>{
        Event.find({}).then(
          data=>{
            res.json(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    delete: (req,res)=>{
        Event.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
update: (req, res)=>{

  console.log("updating")
  const {title, 
    description,
    venue,
    date,
    time,
    userId,
    price,

} = req.body
    Event.findByIdAndUpdate(req.params.id, {
      title,
       description,
    venue,
      date,
    time,
       price,
       userId,
        _id:req.params.id
        },  {
          new: true
        }).
        then(data=>{
          console.log(data);
          res.send(data);
        }).catch(err=>{
          console.log(err);
        })
      },


      togglePublish: (req, res, id)=>{
        Event.findById(req.params.id).then(
          data=>{
           const isPublished= data.isPublished;
           console.log("publish 117: "+ isPublished)
           if(isPublished === "true"){
            Event.findByIdAndUpdate(req.params.id, {
              isPublished: false,
               _id:req.params.id
               },  {
                 new: true
               }).
               then(data=>{
                // console.log("is published: "+data);
                 res.send(data);
               }).catch(err=>{
                 console.log(err);
               })
           }else{
            Event.findByIdAndUpdate(req.params.id, {
              isPublished: true,
               _id:req.params.id
               },  {
                 new: true
               }).
               then(data=>{
                 console.log("is published: "+data);
                 res.send(data);
               }).catch(err=>{
                 console.log(err);
               })
           }
          }
        ).catch(err=>{
          console.log(err);
        })
      },

      toggleComplete: (req, res, id)=>{
        Event.findById(req.params.id).then(
          data=>{
           const isCompleted= data.isCompleted;
           console.log("complete 155: "+ isCompleted)
           if(isCompleted === "true"){
            Event.findByIdAndUpdate(req.params.id, {
              isCompleted: false,
               _id:req.params.id
               },  {
                 new: true
               }).
               then(data=>{
                // console.log("is published: "+data);
                 res.send(data);
               }).catch(err=>{
                 console.log(err);
               })
           }else{
            Event.findByIdAndUpdate(req.params.id, {
              isCompleted: true,
               _id:req.params.id
               },  {
                 new: true
               }).
               then(data=>{
                 console.log("is published: "+data);
                 res.send(data);
               }).catch(err=>{
                 console.log(err);
               })
           }
          }
        ).catch(err=>{
          console.log(err);
        })
      }
}


module.exports = event;
