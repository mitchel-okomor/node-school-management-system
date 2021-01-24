var express = require("express");
var router = express.Router();
const staff = require("../controllers/staff");
const auth = require("../middleware/auth");
const uplaod = require("../middleware/upload");
const student = require("../controllers/student");
const info = require("../controllers/info");
const course = require("../controllers/courses");
const subjectClass = require("../controllers/subjectClass");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//info routes
router.post("/info", auth.jwt, info.create);
router.get("/info/:id", info.getOne);
router.get("/info", info.getAll);
router.patch("/info/:id", auth.jwt, info.updateOne);
router.delete("/info/:id", auth.jwt, info.deleteOne);

//class routes
router.post("/class", auth.jwt, subjectClass.create);
router.get("/class/:id", subjectClass.getOne);
router.get("/classes", subjectClass.getAll);
router.patch("/class/:id", auth.jwt, subjectClass.updateOne);
router.delete("/class/:id", auth.jwt, subjectClass.deleteOne);

//courses routes
router.post("/course", auth.jwt, course.create);
router.get("/course/:id", course.getOne);
router.get("/courses", course.getAll);
router.patch("/course/:id", auth.jwt, course.updateOne);
router.delete("/course/:id", auth.jwt, course.deleteOne);

//staff routes
router.post("/staff", uplaod.single("image"), auth.register);
router.post("/staff/login", auth.login_staff);
router.get("/staff/:id", auth.jwt, staff.getOne);
router.get("/staffs", auth.jwt, staff.getAll);
router.patch("/staff", auth.jwt, staff.updateOne);
router.delete("/staff", auth.jwt, staff.deleteOne);

//student routes
router.post("/student", uplaod.single("image"), auth.registerStudent);
router.post("/student/login", auth.login_student);
router.get("/student/:id", auth.jwt, student.getOne);
router.get("/students", auth.jwt, student.getAll);
router.patch("/student/:id", auth.jwt, student.updateOne);
router.delete("/student/:id", auth.jwt, student.deleteOne);

module.exports = router;
