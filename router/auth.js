const jwt = require("jsonwebtoken");
const config = require("../config");

const authDoctorMiddleware = (req, res, next) => {
  let token = "";
  if (req.session) token = req.session.token;
  if (token) {
    jwt.verify(token, config.jwtKey, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ ok: false, message: "token invalid" });
      } else {
        // console.log(decoded);
        req.patient = decoded.patientId;
        req.doctor = decoded.doctorId;
        next();
      }
    });
  } else {
    res.status(401).json({ ok: false, message: "no token" });
  }
};
const authAdminMiddleware = (req, res, next) => {
  let token = "";
  if (req.session) token = req.session.token;
  if (token) {
    jwt.verify(token, config.jwtKey, (err, decoded) => {
      if (err) {
        console.log(err);
        res.redirect('/prescription/admin/login')
      } else {
        if(decoded.admin){
          console.log({decoded})
        next();
        }
        else{
          res.redirect('/prescription/admin/login')
        }
      }
    });
  } else {

    res.redirect('/prescription/admin/login')
  }
};

const authAdminMiddlewareForLogin = (req, res, next) => {
  let token = "";
  if (req.session) token = req.session.token;
  if (token) {
    jwt.verify(token, config.jwtKey, (err, decoded) => {
      if (err) {
        next()
      } else {
        if(decoded.admin){
        res.redirect('/prescription/admin/')
        }
        else{
          next()
        }
      }
    });
  } else {
    next()
  }
};







module.exports = {
  authDoctorMiddleware,
  authAdminMiddleware,
  authAdminMiddlewareForLogin
};
