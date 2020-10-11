// const db = require("./db");


const initScripts = [

]

// initScripts.forEach((sql) => {
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

const fs = require('fs');

let writeData = ''

initScripts.forEach((s)=>{
    writeData += s
})

fs.writeFile('db.sql', writeData, (err)=>{
    if(err){
        console.log('Error')
    }
    else {
        console.log('Successfull')
    }
})