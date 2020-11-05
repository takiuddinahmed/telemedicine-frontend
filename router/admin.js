const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("../cors");
const config = require("../config");
const db = require("../database/db");
const { authAdminMiddleware, authAdminMiddlewareForLogin } = require("./auth");
const { route } = require("./prescription");
const authAdmin = require("./auth").authAdminMiddleware

router.use(express.json());
router.use(bodyParser.urlencoded({extended: true}))

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.route("/login")
.get(authAdminMiddlewareForLogin,(req,res,next)=>{
  req.session.destroy()
    res.render('adminLogin')
})
.post((req,res,next)=>{
  const { email, password, remember } = req.body;
  // console.log({ email, password, remember })
  let sql = `SELECT * from admin_user where email = (?)`;
  db.query(sql,[email], (err,result)=>{
    // console.log({err,result})
    if(err){
      res.render("error", {
                errorCode: 401,
                errorText: "Incorrect username or password. Please try again",
              });
    }
    else if (result.length){
      const match = bcrypt.compareSync(password, result[0].password);
      const options = {};
      if (!remember){
        options.expiresIn = '1h';
      }
      if (match){
        const token = jwt.sign(
        { admin: true, id: result[0].id},
        config.jwtKey,
          options
      );
      req.session.token = token;
      res.redirect("/prescription/admin");
      }
      else{
        res.render("error", {
          errorCode: 401,
          errorText: "Incorrect username or password. Please try again",
        });
      }
     
    }
    else{
      res.render("error", {
        errorCode: 401,
        errorText: "Incorrect username or password. Please try again",
      });
    }
    
  })
})

// router.post('/register',(req,res,next)=>{
//   const {email, password} = req.body;
//   const hash = bcrypt.hashSync(password, config.saltRounds);
//   let sql = `INSERT INTO admin_user (email, password) VALUES(?)`;
//   db.query(sql, [[email, hash]], (err, result)=>{
//     if(err){
//       res.render("error", {
//         errorCode: 401,
//         errorText: "Unauthorized User",
//       });
      
//     }
//     else{
//       const token = jwt.sign(
//         { admin: true, id: result.insertedId },
//         config.jwtKey,
//         { expiresIn: "2h" }
//       );
//       req.session.token = token;
//       res.redirect("/prescription/admin");
//     }
//   })

// })


router.get('/logout', (req,res)=>{
  req.session.destroy();
  res.redirect('/prescription/admin/login');
})

router.use(authAdminMiddleware)

router.get('/', (req,res)=>{
  res.redirect('/prescription/admin/drug')
})

router.route("/disease").get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  if (add || edit) {
    res.render("disease");
  } else {
    res.render("diseaseList");
  }
});
router.route("/drug").get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  if (add || edit) {
    res.render("drug");
  } else {
    res.render("drugList");
  }
});

router.route("/doctor").get((req, res, next) => {
  res.render("doctorControl");
});
router.route("/patient").get((req, res, next) => {
  res.render("paitentTable");
});

module.exports = router;
