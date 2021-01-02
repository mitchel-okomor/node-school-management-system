var express = require('express');
var router = express.Router();
const staff = require("../controllers/staff");
const auth = require('../middleware/auth');
const uplaod = require('../middleware/upload');
const student = require('../controllers/student');
const info = require('../controllers/info');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//staff routes
router.post('/info', auth.jwt, info.create);
router.get('/info/:id', auth.jwt, info.getOne);
router.get('/info', auth.jwt, info.getAll);
router.patch('/info', auth.jwt, info.updateOne);
router.delete('/info', auth.jwt, info.deleteOne);


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




module.exports = router;
