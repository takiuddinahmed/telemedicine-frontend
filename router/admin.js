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
const { Template } = require("ejs");
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
  res.redirect('/prescription/admin/generic-drug')
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
router.route("/generic-drug")
.get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  if (add || edit) {
    db.query(`SELECT generic_name from generic_drug_data`,[], (err,drugList)=>{
      if(err){
        
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else{
        if(edit){
          const d_id = req.query.id;
          if(d_id){
            const sql =` SELECT * from generic_drug_data WHERE id=?`;
            db.query(sql,[d_id],(err, result)=>{
              if(err){
                res.render("error", {
                  errorCode: 500,
                  errorText: "Unexpected request. Please try again.",
                });
              }
              else{
                const drugData = {...result[0]};
                drugData.dose_range = JSON.parse(drugData.dose_range);
                drugData.dose_weight = JSON.parse(drugData.dose_weight);
                drugData.dose_drug_interection = JSON.parse(drugData.dose_drug_interection);
                drugData.dose_indication = JSON.parse(drugData.dose_indication);
                drugData.dose_constrains = JSON.parse(drugData.dose_constrains);
                drugData.dose_precautions_warnings = JSON.parse(drugData.dose_precautions_warnings);
                drugData.dose_pregnency_category = JSON.parse(drugData.dose_pregnency_category);

                console.log(drugList)
                res.render("genericDrug", {editState: true, drugData: JSON.stringify(drugData), drugList:drugList});
              }
            })
          }
        }
      
      else{
        res.render("genericDrug", {editState: false, drugData: {}, drugList:drugList});
      }
    }
    })
  
    
  } else {
    const sql = `SELECT id, generic_name FROM generic_drug_data`;
    db.query(sql,[], (err,result)=>{
      if(err){
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else{
        console.log(result)
        res.render("genericDrugList",{drugList:JSON.stringify(result)});
      }
    })
  }
})
.post((req,res,next)=>{
  const {generic_name, dose_range, dose_weight,dose_drug_interection, dose_indecation,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category} = req.body;
  const sql = `
  INSERT INTO generic_drug_data (generic_name, dose_range, dose_weight,dose_drug_interection, dose_indecation,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category) VALUES(?)
  `
  db.query(sql,[[generic_name, dose_range, dose_weight,dose_drug_interection, dose_indecation,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category]], (err, result)=>{
    if(err){
      res.json({ok: false, err: err})
    }
    else{
      res.json({ok:true});
    }
  })
})
.put((req,res,next)=>{
  const {id,generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category} = req.body;
  console.log(req.body)
  const sql = `
    UPDATE generic_drug_data SET generic_name=?, dose_range=?, dose_weight=?, dose_drug_interection=?, dose_indication=?,  dose_constrains=?, dose_precautions_warnings=?,  dose_pregnency_category=? WHERE id=?
  `
  db.query(sql,[generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category,id], (err, result)=>{
    if(err){
      res.json({ok: false, err: 'Update error. Please try again.'})
    }
    else{
      res.json({ok:true});
    }
  })
})

router.route("/drug").get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  if (add || edit) {
    db.query(`SELECT id,generic_name from generic_drug_data`,[], (err,genericDrugList)=>{
      if(err){
        
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else{
        if(add){
          res.render("drug", {genericDrugList:genericDrugList, mode:"POST", tradeDrug:{}, edit:false});
        }
        else{
          id=req.query.id;
          db.query(`SELECT * from trade_drug_data WHERE id=?`,[id],(err, tradeDrugData)=>{
            if(err){
              res.render("error", {
                errorCode: 500,
                errorText: "Unexpected request. Please try again.",
              });
            }
            else{
              res.render("drug", {genericDrugList:genericDrugList, mode:"PUT",tradeDrug:tradeDrugData[0], edit:true});
            }
          
        })
        }
      }})
    
  } else {
    db.query(`SELECT trade_drug_data.*, generic_drug_data.generic_name FROM trade_drug_data LEFT JOIN generic_drug_data ON trade_drug_data.generic_name_id=generic_drug_data.id`, [], (err,allTradeDrugList)=>{
      if(err){
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else{
        const tradeList = [...allTradeDrugList];
      res.render("drugList", {tradeDrugList: JSON.stringify(tradeList)});
      }
  })
  }
})
.post((req,res)=>{
  const {trade_name, company_name, generic_name_id, price,id,_method} = req.body;
  let sql = `
    INSERT INTO trade_drug_data (trade_name, company_name, generic_name_id, price) VALUES(?)
  `
  let arr = [[trade_name, company_name, generic_name_id, price]];
  if(_method === 'PUT'){
    sql = `UPDATE trade_drug_data SET trade_name=?, company_name=?, generic_name_id=?, price=? WHERE id=?`
    arr = [trade_name, company_name, generic_name_id, price,id]
    console.log({id})
  }
  db.query(sql,arr, (err, result)=>{
    if(err){
      console.log(err)
      res.render("error", {
        errorCode: 500,
        errorText: "Unexpected request. Please try again.",
      });
    }
    else{
      console.log(result)
      res.redirect('/prescription/admin/drug')
    }
  })
  
})


router.route("/templates/:template")
.get((req,res)=>{
  const template = req.params.template;
  const success = req.query.success;
  let successStatus = ''
  if(success){
    if(success == 'true'){
      successStatus = 'Operation Successfull'
    }
    else{
      successStatus = 'Operation Failed'
    }
  }
  const templateList = [
    {name: 'cc', table: 'cc_template', display: 'C/C'},
    {name: 'dose', table: 'dose_list' , display: 'Dose'},
    {name: 'duration', table: 'duration_list', display: 'Duration'},
    {name: 'investigation', table: 'investigation', display: 'Investigation'},
    {name: 'advice', table: 'advice', display: 'Advice'},
    {name: 'counselling', table: 'counselling', display: 'Counselling'},
  ]
  const requestedTemplate = templateList.filter(t=> t.name === template)
  if(requestedTemplate.length){
    db.query(`SELECT * FROM ${requestedTemplate[0].table}`,[], (err, templateDataList)=>{
    if(err){
      console.log(err)
      res.render("error", {
        errorCode: 500,
        errorText: "Unexpected request. Please try again.",
      });
    }
    else{
      res.render('template', 
    {
      name: requestedTemplate[0].name, 
      table: requestedTemplate[0].table,
      display: requestedTemplate[0].display,
      successStatus: successStatus,
      templateDataList: JSON.stringify(templateDataList),
    })
  }
  })
  }
  else{
    res.render("error", {
      errorCode: 404,
      errorText: "Unexpected request. Please try again.",
    });
  }
})
.post((req,res)=>{
  const {name, table, mode, id} = req.body;
  let sql = `
  INSERT INTO ${table} (name) VALUES(?)
  `
  let arr = [name]
  if(mode != 'add'){
    sql = `
      UPDATE ${table} SET name=? WHERE id=?
    `
    arr = [name,id]
  }
  db.query(sql, arr, (err, result)=>{
    if(err){
      console.log(err);
      res.redirect(req.baseUrl + req.url )
    }
    else{
      res.redirect(req.baseUrl + req.url )
    }
  })
  
})


router.route("/doctor").get((req, res, next) => {
  res.render("doctorControl");
});
router.route("/patient").get((req, res, next) => {
  res.render("paitentTable");
});

module.exports = router;
