const express = require("express");
const router = express.Router();
const path = require("path");
// const bcrypt = require("bcrypt")
const crypto = require('crypto');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("../cors");
const config = require("../config");
const db = require("../database/db");
const { authAdminMiddleware, authAdminMiddlewareForLogin } = require("./auth");
const { route } = require("./prescription");
const { Template } = require("ejs");
const authAdmin = require("./auth").authAdminMiddleware;
const diseaseData = require("./defaultdata/disease");


router.use(express.json());
router.use(
  express.urlencoded(
    {extended: true}
    )
  )

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
      // const match = bcrypt.compareSync(password, result[0].password);
      // const newHash = crypto.scryptSync(password,config.salt,64).toString('hex');
      // console.log({newHash, result})
      const match = password === result[0].password;
      const options = {};
      if (!remember){
        options.expiresIn = '6h';
      }
      if (match){
        const token = jwt.sign(
        { admin: true, id: result[0].id},
        config.jwtKey,
          options
      );
      req.session.token = token;
      res.redirect("/admin");
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
//   // const hash = bcrypt.hashSync(password, config.saltRounds);
//   // const hash = crypto.scryptSync(password,config.salt,64).toString('hex');
//   let sql = `INSERT INTO admin_user (email, password) VALUES(?)`;
//   db.query(sql, [[email, password]], (err, result)=>{
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
  res.redirect('/admin/login');
})

router.use(cors.corsWithOptions);
router.use(authAdminMiddleware)


router.get('/', (req,res)=>{
  res.redirect('/admin/disease')
})

router.route('/disease/alternative')
.get((req,res)=>{
  res.render('alternativeName')
})

router.route("/disease")
.get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  const del = req.query.delete;
  
  if (add || edit) {
    const templateSql = `SELECT * FROM cc_template; 
    SELECT id,title FROM investigation; 
    SELECT id,title FROM advice; 
    SELECT id,title FROM counselling;
    SELECT id, generic_name as title FROM generic_drug_data;
    `
    db.query(templateSql,[], (err, templateDataArr)=>{
      // console.log(templateDataArr)
      if(err){
        console.log(err)
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else{
        const templateData = [
          {id: 'cc', data:templateDataArr[0], name:"C/C"},
          {id: 'investigation', data:templateDataArr[1], name:"Investigation"},
          {id: 'advice', data:templateDataArr[2], name:"Advice"},
          {id: 'counselling', data:templateDataArr[3], name:"Counselling"},
          {id: 'medicine', data:templateDataArr[4], name:"Medicine"}
          
        ]
       if(add){
        //  console.log(templateData[4].data)
        res.render("disease", {templateData:templateData, editDiseaseData: {}, mode:'add'});
        }
        else if(edit){
          const id = req.query.id;
          if(id){
          const editDiseaseSql =  `SELECT * FROM disease_data WHERE id=?`
          db.query(editDiseaseSql,[id], (err, editDiseaseData)=>{
              if(err){
                res.render("error", {
                  errorCode: 500,
                  errorText: "Unexpected request. Please try again.",
                });
              }
              else{

                res.render("disease", {templateData:templateData, editDiseaseData: editDiseaseData[0], mode: 'edit'});
              }
          })
          }
          else{
            res.render("error", {
              errorCode: 500,
              errorText: "Unexpected request. Please try again.",
            });
          }
        }
      }
    })
    
  }

  else if(del){
    const id = req.query.id;
    if(id){
      db.query(`DELETE FROM disease_data WHERE id=?`,[id],(err, deleteRes)=>{
        if(err){
          res.render("error", {
           errorCode: 400,
            errorText: "Unexpected request. Please try again.",
          })
        }
        else(
          res.redirect('/admin/disease')
        )
      })
    }
    else{
       res.render("error", {
        errorCode: 400,
        errorText: "Unexpected request. Please try again.",
      })
    }
  }
   else {
    const sql = ` SELECT id,name FROM disease_data WHERE doctor_id=-1`;
    db.query(sql,[],(err, diseaseList)=>{
      if(err){
        console.log(err);
         res.render("error", {
        errorCode: 400,
        errorText: "Unexpected request. Please try again.",
      });
      }
      else{
        // const list = diseaseList.map((d)=>{
        //   d.cc = JSON.parse(d.cc);
        //   d.advice = JSON.parse(d.advice);
        //   d.investigation = JSON.parse(d.investigation);
        //   d.counselling = JSON.parse(d.counselling);
        //   return d;
        // })
        res.render("diseaseList", {diseaseList: JSON.stringify(diseaseList)} );
      }
    })
  }
})
.post(cors.corsWithOptions, (req, res,next)=>{

  let {
    name,alternative_name,bp,pulse,temp,heart,lungs,abd,anaemia,jaundice,cyanosis,oedema,
    se_nervous_system_palpation,se_nervous_system_inspection,se_nervous_system_percussion,se_nervous_system_auscultation,
    se_cvs_palpation,se_cvs_inspection,se_cvs_percussion,se_cvs_auscultation,
    se_alimentary_system_palpation,se_alimentary_system_inspection,se_alimentary_system_percussion,se_alimentary_system_auscultation,
    se_musculoskeletal_system_palpation,se_musculoskeletal_system_inspection,se_musculoskeletal_system_percussion,se_musculoskeletal_system_auscultation,
    se_respiratory_system_palpation,se_respiratory_system_inspection,se_respiratory_system_percussion,se_respiratory_system_auscultation,
    special_note,cc,investigation,advice,counselling, medicine} = req.body;

    bp = bp.length ? bp : diseaseData.bp;
    pulse = pulse.length ? pulse : diseaseData.pulse;
    temp = temp.length ? temp : diseaseData.temp;
    heart = heart.length ? heart : diseaseData.heart;
    lungs = lungs.length ? lungs : diseaseData.lungs;
    abd = abd.length ? abd : diseaseData.abd;
    anaemia = anaemia.length ? anaemia : diseaseData.default;
    jaundice = jaundice.length ? jaundice : diseaseData.default;
    cyanosis = cyanosis.length ? cyanosis : diseaseData.default;
    oedema = oedema.length ? oedema : diseaseData.default;

    se_nervous_system_palpation = se_nervous_system_palpation.length ? se_nervous_system_palpation : diseaseData.default;
    se_nervous_system_inspection = se_nervous_system_inspection.length ? se_nervous_system_inspection : diseaseData.default;
    se_nervous_system_percussion = se_nervous_system_percussion.length ? se_nervous_system_percussion : diseaseData.default;
    se_nervous_system_auscultation = se_nervous_system_auscultation.length ? se_nervous_system_auscultation : diseaseData.default;

    se_cvs_palpation = se_cvs_palpation.length ? se_cvs_palpation : diseaseData.default;
    se_cvs_inspection = se_cvs_inspection.length ? se_cvs_inspection : diseaseData.default;
    se_cvs_percussion = se_cvs_percussion.length ? se_cvs_percussion : diseaseData.default;
    se_cvs_auscultation = se_cvs_auscultation.length ? se_cvs_auscultation : diseaseData.default;

    se_alimentary_system_palpation = se_alimentary_system_palpation.length ? se_alimentary_system_palpation : diseaseData.default;
    se_alimentary_system_inspection = se_alimentary_system_inspection.length ? se_alimentary_system_inspection : diseaseData.default;
    se_alimentary_system_percussion = se_alimentary_system_percussion.length ? se_alimentary_system_percussion : diseaseData.default;
    se_alimentary_system_auscultation = se_alimentary_system_auscultation.length ? se_alimentary_system_auscultation : diseaseData.default;

    se_musculoskeletal_system_palpation = se_musculoskeletal_system_palpation.length ? se_musculoskeletal_system_palpation : diseaseData.default;
    se_musculoskeletal_system_inspection = se_musculoskeletal_system_inspection.length ? se_musculoskeletal_system_inspection : diseaseData.default;
    se_musculoskeletal_system_percussion = se_musculoskeletal_system_percussion.length ? se_musculoskeletal_system_percussion : diseaseData.default;
    se_musculoskeletal_system_auscultation = se_musculoskeletal_system_auscultation.length ? se_musculoskeletal_system_auscultation : diseaseData.default;

    se_respiratory_system_palpation = se_respiratory_system_palpation.length ? se_respiratory_system_palpation : diseaseData.default;
    se_respiratory_system_inspection = se_respiratory_system_inspection.length ? se_respiratory_system_inspection : diseaseData.default;
    se_respiratory_system_percussion = se_respiratory_system_percussion.length ? se_respiratory_system_percussion : diseaseData.default;
    se_respiratory_system_auscultation = se_respiratory_system_auscultation.length ? se_respiratory_system_auscultation : diseaseData.default;

    special_note = special_note ? special_note.length : diseaseData.default;

    // get states
  let fixed_datas = [];

  for (const [key, value] of Object.entries(req.body)) {
    if (key.match(/[\w_]*state/)) {
      if (value == 'on') {
        fixed_datas.push(key);
      }
    }
  }

  fixed_datas = JSON.stringify(fixed_datas);


    let sql = `INSERT INTO disease_data ( name, alternative_name,bp,pulse,temp,heart,lungs,abd,anaemia,jaundice,cyanosis,oedema,
    se_nervous_system_palpation,se_nervous_system_inspection,se_nervous_system_percussion,se_nervous_system_auscultation,
    se_cvs_palpation,se_cvs_inspection,se_cvs_percussion,se_cvs_auscultation,
    se_alimentary_system_palpation,se_alimentary_system_inspection,se_alimentary_system_percussion,se_alimentary_system_auscultation,
    se_musculoskeletal_system_palpation,se_musculoskeletal_system_inspection,se_musculoskeletal_system_percussion,se_musculoskeletal_system_auscultation,
    se_respiratory_system_palpation,se_respiratory_system_inspection,se_respiratory_system_percussion,se_respiratory_system_auscultation,
    special_note,cc,investigation,advice,counselling,medicine,fixed_data) VALUES(?)`

    db.query(sql,[[ name,alternative_name,bp,pulse,temp,heart,lungs,abd,anaemia,jaundice,cyanosis,oedema,
    se_nervous_system_palpation,se_nervous_system_inspection,se_nervous_system_percussion,se_nervous_system_auscultation,
    se_cvs_palpation,se_cvs_inspection,se_cvs_percussion,se_cvs_auscultation,
    se_alimentary_system_palpation,se_alimentary_system_inspection,se_alimentary_system_percussion,se_alimentary_system_auscultation,
    se_musculoskeletal_system_palpation,se_musculoskeletal_system_inspection,se_musculoskeletal_system_percussion,se_musculoskeletal_system_auscultation,
    se_respiratory_system_palpation,se_respiratory_system_inspection,se_respiratory_system_percussion,se_respiratory_system_auscultation,
    special_note,cc,investigation,advice,counselling,medicine,fixed_datas]], (err,result)=>{
      if(err){
        console.log(err)
        if(err.code == 'ER_DUP_ENTRY'){
          res.json({ok:false, err: 'Disease already exists.'})
        }
        else
        res.json({ok:false, err: 'Insert error. Try again', msg: err})
      }
      else{
        res.json({ok:true})
      }
    })
})
.put(cors.corsWithOptions,(req, res,next)=>{
  const {
    name,alternative_name,bp,pulse,temp,heart,lungs,abd,anaemia,jaundice,cyanosis,oedema,
    se_nervous_system_palpation,se_nervous_system_inspection,se_nervous_system_percussion,se_nervous_system_auscultation,
    se_cvs_palpation,se_cvs_inspection,se_cvs_percussion,se_cvs_auscultation,
    se_alimentary_system_palpation,se_alimentary_system_inspection,se_alimentary_system_percussion,se_alimentary_system_auscultation,
    se_musculoskeletal_system_palpation,se_musculoskeletal_system_inspection,se_musculoskeletal_system_percussion,se_musculoskeletal_system_auscultation,
    se_respiratory_system_palpation,se_respiratory_system_inspection,se_respiratory_system_percussion,se_respiratory_system_auscultation,
    special_note,cc,investigation,advice,counselling,medicine,id} = req.body
  
    // fixed data
  let fixed_datas = [];

  for (const [key, value] of Object.entries(req.body)) {
    if (key.match(/[\w_]*state/)) {
      if (value == 'on'){
        fixed_datas.push(key);
      }
    }
  }
  
  fixed_datas = JSON.stringify(fixed_datas);

  let sql = `UPDATE disease_data SET name=?,alternative_name=?,bp=?,pulse=?,temp=?,heart=?,lungs=?,abd=?,anaemia=?,jaundice=?,cyanosis=?,oedema=?,
   se_nervous_system_palpation=?,se_nervous_system_inspection=?,se_nervous_system_percussion=?,se_nervous_system_auscultation=?,
   se_cvs_palpation=?,se_cvs_inspection=?,se_cvs_percussion=?,se_cvs_auscultation=?,
   se_alimentary_system_palpation=?,se_alimentary_system_inspection=?,se_alimentary_system_percussion=?,se_alimentary_system_auscultation=?,
   se_musculoskeletal_system_palpation=?,se_musculoskeletal_system_inspection=?,se_musculoskeletal_system_percussion=?,se_musculoskeletal_system_auscultation=?,
   se_respiratory_system_palpation=?,se_respiratory_system_inspection=?,se_respiratory_system_percussion=?,se_respiratory_system_auscultation=?,
   special_note=?,cc=?,investigation=?,advice=?,counselling=?, medicine=?,fixed_data=? WHERE id=?`

  db.query(sql, [name,alternative_name,bp,pulse,temp,heart,lungs,abd,anaemia,jaundice,cyanosis,oedema,
    se_nervous_system_palpation,se_nervous_system_inspection,se_nervous_system_percussion,se_nervous_system_auscultation,
    se_cvs_palpation,se_cvs_inspection,se_cvs_percussion,se_cvs_auscultation,
    se_alimentary_system_palpation,se_alimentary_system_inspection,se_alimentary_system_percussion,se_alimentary_system_auscultation,
    se_musculoskeletal_system_palpation,se_musculoskeletal_system_inspection,se_musculoskeletal_system_percussion,se_musculoskeletal_system_auscultation,
    se_respiratory_system_palpation,se_respiratory_system_inspection,se_respiratory_system_percussion,se_respiratory_system_auscultation,
    special_note,cc,investigation,advice,counselling,medicine,fixed_datas,parseInt(id)], (err,result)=>{
      if(err){
        console.log(err)
        res.json({ ok: false, err: 'Insert error. Try again', msg: err})
      }
      else{
        res.json({ok:true})
      }
    })
})


router.route("/generic-drug")
.get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  const del = req.query.delete;
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
                drugData.dose_warning_condition = JSON.parse(drugData.dose_warning_condition);
                let advicedata = drugData.advice; 
                delete drugData.advice;
                // console.log(drugList)
                res.render("genericDrug", { editState: true, drugData: JSON.stringify(drugData), drugList: drugList, advice: advicedata});
              }
            })
          }
        }
      
      else{
        res.render("genericDrug", {editState: false, drugData: {}, drugList:drugList,advice:''});
      }
    }
    })
  
    
  }
  else if(del){
    const id = req.query.id;
    if(id){
      db.query(`DELETE FROM generic_drug_data WHERE id=?`,[id],(err, deleteRes)=>{
        if(err){
          res.render("error", {
           errorCode: 400,
            errorText: "Unexpected request. Please try again.",
          })
        }
        else(
          res.redirect('admin/generic-drug')
        )
      })
    }
    else{
       res.render("error", {
        errorCode: 400,
        errorText: "Unexpected request. Please try again.",
      })
    }
  }
  else {
    const sql = `SELECT id, generic_name FROM generic_drug_data`;
    db.query(sql,[], (err,result)=>{
      if(err){
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else{
        // console.log(result)\
        res.render("genericDrugList",{drugList:JSON.stringify(result)});
      }
    })
  }
})
.post(cors.corsWithOptions,(req,res,next)=>{
  const {generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category, dose_warning_condition,advice} = req.body;
  const sql = `
  INSERT INTO generic_drug_data (generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category, dose_warning_condition,advice) VALUES(?)
  `
  db.query(sql,[[generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category, dose_warning_condition,advice]], (err, result)=>{
    if(err){
      res.json({ok: false, err: err})
    }
    else{
      res.json({ok:true});
    }
  })
})
.put(cors.corsWithOptions,(req,res,next)=>{
  const {id,generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category, dose_warning_condition,advice} = req.body;
  // console.log(req.body)
  const sql = `
    UPDATE generic_drug_data SET generic_name=?, dose_range=?, dose_weight=?, dose_drug_interection=?, dose_indication=?,  dose_constrains=?, dose_precautions_warnings=?,  dose_pregnency_category=?, dose_warning_condition=?, advice=? WHERE id=?
  `
  db.query(sql,[generic_name, dose_range, dose_weight,dose_drug_interection, dose_indication,  dose_constrains,dose_precautions_warnings,  dose_pregnency_category,dose_warning_condition,advice, id], (err, result)=>{
    if(err){
      res.json({ok: false, err: 'Update error. Please try again.',msg:err})
    }
    else{
      res.json({ok:true});
    }
  })
})

router.route("/drug").get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  const del = req.query.delete;
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
          res.render("drug", {genericDrugList:genericDrugList, mode:"POST", tradeDrug:JSON.stringify([]), edit:false});
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
    
  } 
    else if(del){
    const id = req.query.id;
    if(id){
      db.query(`DELETE FROM trade_drug_data WHERE id=?`,[id],(err, deleteRes)=>{
        if(err){
          res.render("error", {
           errorCode: 400,
            errorText: "Unexpected request. Please try again.",
          })
        }
        else(
          res.redirect('/admin/drug')
        )
      })
    }
    else{
       res.render("error", {
        errorCode: 400,
        errorText: "Unexpected request. Please try again.",
      })
    }
  }

  else {
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
.post(cors.corsWithOptions,(req,res)=>{
  const { tradeDrugArray, trade_name, company_name, generic_name_id, price, id, _method} = req.body;
  let sql = `
    INSERT INTO trade_drug_data (trade_name, company_name,price, generic_name_id) VALUES ?
  `
  let arr = [tradeDrugArray];
  if(_method === 'PUT'){
    sql = `UPDATE trade_drug_data SET trade_name=?, company_name=?, generic_name_id=?, price=? WHERE id=?`
    arr = [trade_name, company_name, generic_name_id, price,id]
    console.log({id})
  }
  db.query(sql,arr, (err, result)=>{
    if(err){
      console.log(err)
      if (_method === 'PUT') {
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
       else res.json({ok:false,err, result})
    }
    else{
      console.log(result)
      if (_method === 'PUT') {
       res.redirect('/admin/drug')
      }
      else res.json({ok:true,result})
    }
  })
  
})


router.route("/templates/:template")
.get((req,res)=>{
  const template = req.params.template;
  const success = req.query.success;
  const del = req.query.delete;

  console.log(template)

  if(del){
    const id = req.query.id;
    const table = req.query.table;
    db.query(`DELETE FROM ${table} WHERE id=?`, [id], (err, deleteResult)=>{
      if(err){
        console.log(err)
         res.render("error", {
        errorCode: 500,
        errorText: "Unexpected request. Please try again.",
      });
      }
      else{
        res.redirect("/admin/templates/"+template)
      }
    })
  }
  else{

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
    db.query(`SELECT id,title FROM ${requestedTemplate[0].table}`,[], (err, templateDataList)=>{
    if(err){
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
}
})
.post((req,res)=>{
  const {title, details, table, mode, id} = req.body;
  let sql = `
  INSERT INTO ${table} (title, details) VALUES(?)
  `
  let arr = [[title,details]]
  if(mode != 'add'){
    sql = `
      UPDATE ${table} SET title=?, details=? WHERE id=?
    `
    arr = [title,details,id]
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


router.get("/doctor-drug-entry",(req,res)=>{
  if(req.query.id){
    let id = req.query.id;
    let delete_sql = `DELETE FROM doctor_drug_entry WHERE id=?`
    db.query(delete_sql, [id],(err,result)=>{
      res.redirect('/admin/doctor-drug-entry')
    })
  }
  else{
    let sql = `SELECT * FROM doctor_drug_entry`;
    db.query(sql, [],(err,result)=>{
      if (err) {
        res.render("error", {
          errorCode: 500,
          errorText: "Unexpected request. Please try again.",
        });
      }
      else {
        res.render('doctor-drug-entry',
          {drugList:result}
    )}
    })
  }})



router.route("/doctor").get((req, res, next) => {
  res.render("doctorControl");
});
router.route("/patient").get((req, res, next) => {
  res.render("paitentTable");
});


// extra routes for api call
router.get("/api/template/:name", (req,res)=>{
  let templateName = req.params.name;
  let id = req.query.id;
  console.log(templateName)
  id = parseInt(id);
  if(!id){
    res.status(400).json({error:true, data:"Invalid request"})
  }
  else{
  let sql = `SELECT details FROM ${templateName} WHERE id=?`;
  db.query(sql,[id],(err,result)=>{
    if(err){
      console.log({err});
      res.status(500).json({error:true, data:"Internal Server Error"})
    }
    else{
      res.status(200).json(result)
    }
  })
}

})

module.exports = router;
