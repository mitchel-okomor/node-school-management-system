const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/staff");
require("../models/student");
require("../models/staff");
const dotenv = require("dotenv");
dotenv.config();

require("../models/staff");

const Staff = mongoose.model("staff");
const Student = mongoose.model("student");

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

//register a staff
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log(req.body);
      //hash password with bcrypt-nodejs
      let salt = bcrypt.genSaltSync(10);
      bcrypt.hash(req.body.password, salt, null, (error, hash) => {
        if (error) {
          console.log(error);
        }

        //get all staff information, password has already been declared in function parameters and will be hashed below
        const {
          firstname,
          lastname,
          phone,
          address,
          state_of_origin,
          date_of_birth,
          subject,
          salary,
          email,
          category,
          image_url,
        } = req.body;

        let password = hash;

        //create new staff
        try {
          const newUser = new Staff({
            firstname,
            lastname,
            phone,
            address,
            state_of_origin,
            date_of_birth,
            subject,
            salary,
            email,
            category,
            password,
            image_url,
          });
          newUser
            .save()
            .then((staff) => {
              console.log("Mongo: " + staff);
              if (!staff) {
                return done(null, false, { message: "staff not registered" });
              }
              if (staff) {
                //prepare staff info for res
                const data = {
                  firstname: staff.firstname,
                  lastname: staff.lastname,
                  username: staff.username,
                  category: staff.category,
                  email: staff.email,
                  phone: staff.phone,
                  userId: staff._id,
                };

                //sign token for staff
                const token = jwt.sign(
                  {
                    staffId: staff.id,
                  },
                  process.env.SECRET,
                  { expiresIn: "12h" }
                );

                //send to staff
                return done(null, staff, {
                  status: "success",
                  message: "staff successfully created",
                  data,
                  token,
                });
              }
              return done(null, staff);
            })
            .catch((err) => {
              console.log(err);
              return done(err, null, null);
            });
        } catch (err) {
          if (err) {
            throw err;
          }
        }
      });
    }
  )
);

//register a Student
passport.use(
  "register_student",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log(req.body);
      //hash password with bcrypt-nodejs
      let salt = bcrypt.genSaltSync(10);
      bcrypt.hash(req.body.password, salt, null, (error, hash) => {
        if (error) {
          console.log(error);
        }

        //get all staff information, password has already been declared in function parameters and will be hashed below
        const {
          firstname,
          lastname,
          subject_class,
          date_of_birth,
          address,
          state_of_residence,
          state_of_origin,
          email,
          phone,
        } = req.body;

        let password = hash;

        //create new student account
        try {
          const newStudent = new Student({
            firstname,
            lastname,
            subject_class,
            date_of_birth,
            state_of_residence,
            state_of_origin,
            phone,
            address,
            email,
            password,
            image_url: req.file.filename,
          });
          newStudent
            .save()
            .then((student) => {
              console.log("Mongo: " + student);
              if (!student) {
                return done(null, false, { message: "staff not registered" });
              }
              if (student) {
                //prepare staff info for res
                const data = {
                  firstname: student.firstname,
                  lastname: student.lastname,
                  username: student.username,
                  role: student.role,
                  email: student.email,
                  phone: student.phone,
                  userId: student._id,
                };

                //sign token for staff
                const token = jwt.sign(
                  {
                    studentId: student.id,
                  },
                  process.env.SECRET,
                  { expiresIn: "12h" }
                );

                //send to staff
                return done(null, student, {
                  status: "success",
                  message: "staff successfully created",
                  data,
                  token,
                });
              }
              return done(null, student);
            })
            .catch((err) => {
              console.log(err);
              return done(err, null, null);
            });
        } catch (err) {
          if (err) {
            throw err;
          }
        }
      });
    }
  )
);

//login a staff
passport.use(
  "login-staff",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("Strategy " + username);

      Staff.findOne({ email: username }, {}).then((staff) => {
        if (!staff) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        } else {
          console.log("bcrypt " + staff.password);
          //compare staff imputed password with database password
          bcrypt.compare(password, staff.password, (error, valid) => {
            console.log(valid);
            if (error) {
              console.log(error);
            } else if (!password || !valid) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            } else {
              const token = jwt.sign(
                {
                  userId: staff.id,
                },
                process.env.SECRET,
                { expiresIn: "12h" }
              );
              const data = {
                firstname: staff.firstname,
                lastname: staff.lastname,
                email: staff.email,
                phone: staff.phone,
                role: staff.role,
                _id: staff._id,
              };
              return done(null, staff, {
                status: "success",
                message: "logged in",
                data,
                token,
              });
            }
          });
        }
      });
    }
  )
);

//login a student
passport.use(
  "login-student",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("Strategy " + password);

      Student.findOne({ email: username }, {}).then((student) => {
        if (!student) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        } else {
          console.log("bcrypt " + student.password);
          //compare student imputed password with database password
          bcrypt.compare(password, student.password, (error, valid) => {
            if (error) {
              console.log(error);
            } else if (!password || !valid) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            } else {
              const token = jwt.sign(
                {
                  userId: student.id,
                },
                process.env.SECRET,
                { expiresIn: "12h" }
              );
              const data = {
                firstname: student.firstname,
                lastname: student.lastname,
                email: student.email,
                phone: student.phone,
                role: student.role,
                _id: student._id,
              };
              return done(null, student, {
                status: "success",
                message: "logged in",
                data,
                token,
              });
            }
          });
        }
      });
    }
  )
);

//verify a staff token
const opts = {
  jwtFromRequest: ExtractJWT.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
};
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      console.log("JWT passport: " + jwt_payload.userId);
      //Pass the staff details to the next middleware
      return done(null, jwt_payload.userId);
    } catch (error) {
      done(error, false);
    }
  })
);
module.exports = passport;
