const db = require("./db");


const initScripts = [
  `  CREATE TABLE IF NOT EXISTS cc_template (
        id INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
)
`,
`
CREATE TABLE IF NOT EXISTS dose_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
)
`,
`
CREATE TABLE IF NOT EXISTS duration_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
)
`,
    `
    CREATE TABLE IF NOT EXISTS investigation (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
    )
    `,`
    CREATE TABLE IF NOT EXISTS advice (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
    )
    `,
    `CREATE TABLE IF NOT EXISTS counselling (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS disease_data (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) UNIQUE NOT NULL,
    bp VARCHAR(45) NULL,
    palse VARCHAR(45) NULL,
    temp VARCHAR(45) NULL,
    heart VARCHAR(45) NULL,
    lungs VARCHAR(45) NULL,
    abd VARCHAR(45) NULL,
    anamia VARCHAR(45) NULL,
    jaundice VARCHAR(45) NULL,
    cuamosis VARCHAR(45) NULL,
    oedema VARCHAR(45) NULL,
    se_nervousSystem VARCHAR(45) NULL,
   specialNote VARCHAR(45) NULL,
    PRIMARY KEY (id));
    `,
    `
    CREATE TABLE IF NOT EXISTS disease_template_data (
        id INT NOT NULL AUTO_INCREMENT,
        disease_id INT NOT NULL,
        
    )
    `
]



initScripts.forEach((sql) => {
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});

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