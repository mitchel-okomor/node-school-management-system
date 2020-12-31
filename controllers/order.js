const mongoose = require('mongoose');
require('../models/order');

const Order = mongoose.model("order");

const order ={


  create: (req,res)=>{
    const cart = req.body.cart;

    //attach user to order from req
    const orders = cart.map((item)=>{
item.userId = req.body.userId;
return item;
    })
    console.log(orders);
Order.insertMany( orders, function(err,result){
if(err){
  console.log(err)
}
res.status(200).json({
    status: "success",
    data: result,
})
})

        // const order = new Order({
        //   userId: req.body.id,
        //   eventId: req.body.id,
        //   quanity: req.body.quantity,
        //   token:token,
        //   verified:false
        // })
        // order.save()
        // .then(data=>{
        //   console.log(data);
        //   res.send("success");
        // }).catch(err=>{
        //   console.log(err);
        // })
      },
      

     get: (req, res, id)=>{
        Order.findById(req.params.id).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },


      getAll: (req, res)=>{
        console.log("All orders")
        Order.find({}).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    delete: (req,res)=>{
        Order.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
update: (req, res)=>{
    Order.findByIdAndUpdate(req.params.id, {
        quanity: req.body.quantity,
        verified:false
        }).
        then(data=>{
          console.log(data);
          res.send("Updated");
        }).catch(err=>{
          console.log(err);
        })
      },
}


module.exports = order;
