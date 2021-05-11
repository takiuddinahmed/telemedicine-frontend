const db = require('../database/db')

module.exports.responseGetReq = function (sql, arr, res) {
    db.query(sql, arr, (err, data)=>{
        if(err){
            console.log(err)
              res
                .status(500)
                .json({ ok: false, message: "Internal Server Error" });
        
        }
        else{
            res.status(200).json({ ok: true, message: data });
        }
    })
}


module.exports.defaultPrescriptionHeader