var express = require('express');
var router = express.Router();
const staff = require("../controllers/staff");
const event = require("../controllers/event");
const order = require("../controllers/order")
const auth = require('../middleware/auth');
const uplaod = require('../middleware/upload');
const student = require('../controllers/student');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//staff routes
router.post('/staff', uplaod.single('image'), auth.register);
router.post('/staff/login',  auth.login_staff)
router.get('/staff/:id', auth.jwt, staff.getOne);
router.get('/staffs', auth.jwt, staff.getAll);
router.patch('/staff', auth.jwt, staff.updateOne);
router.delete('/staff', auth.jwt, staff.deleteOne);

//student routes
router.post('/student', uplaod.single('image'), auth.registerStudent );
router.post('/student/login', auth.login_student)
router.get('/student/:id', student.getOne);
router.get('/students',  student.getAll);
router.patch('/student/:id',  student.updateOne);
router.delete('/student/:id', student.deleteOne);

//event routes
router.post('/event', auth.jwt, uplaod.single('image'), event.create);
router.get('/events', event.getAll);
router.get('/event/:id', event.get);
router.get('/events/:id',auth.jwt, event.getUserEvents);
router.patch('/event/:id', auth.jwt, uplaod.single('image'), event.update);
router.put('/publish/:id',auth.jwt, event.togglePublish);
router.put('/complete/:id',auth.jwt, event.toggleComplete);
router.delete('/event/:id', auth.jwt, event.delete);


//ticket routes
router.post('/order', auth.jwt,  order.create);
router.get('/orders', auth.jwt, order.getAll);
router.get('/order', auth.jwt, order.get);
router.patch('/order', auth.jwt, order.update);
 
router.delete('/order', auth.jwt, order.delete);



module.exports = router;
