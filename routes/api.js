var express = require('express');
var router = express.Router();
const user = require("../controllers/user");
const event = require("../controllers/event");
const order = require("../controllers/order")
const auth = require('../middleware/auth');
const uplaod = require('../middleware/upload');
const student = require('../controllers/student');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//user routes
router.post('/signup', auth.register);
router.post('/login',  auth.login)
router.get('/user/:id', auth.jwt, user.getUser);
router.get('users', auth.jwt, user.getAllUsers);
router.patch('/user', auth.jwt, user.updateUser);
router.delete('/user', auth.jwt, user.deleteUser);

//student routes
router.post('/student', uplaod.single('image'), student.create );
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
