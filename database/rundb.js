const db = require("./db");

const initScripts = [
  `CREATE TABLE IF NOT EXISTS cc_template (
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
    `,
  `
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
    name VARCHAR(50) NOT NULL UNIQUE,
    bp VARCHAR(45) NULL,
    pulse VARCHAR(45) NULL,
    temp VARCHAR(45) NULL,
    heart VARCHAR(45) NULL,
    lungs VARCHAR(45) NULL,
    abd VARCHAR(45) NULL,
    anaemia VARCHAR(45) NULL,
    jaundice VARCHAR(45) NULL,
    cyanosis VARCHAR(45) NULL,
    oedema VARCHAR(45) NULL,
    se_nervousSystem VARCHAR(45) NULL,
    se_respiratorySystem VARCHAR(45) NULL,
    se_cvs VARCHAR(45) NULL,
    se_alimentarySystem VARCHAR(45) NULL,
    se_musculoskeletalSystem VARCHAR(45) NULL,
    specialNote VARCHAR(45) NULL,
    cc VARCHAR(50),
    investigation VARCHAR(50),
    advice VARCHAR(50),
    counselling VARCHAR(50), 
    PRIMARY KEY (id));
    `,

    `
    CREATE TABLE IF NOT EXISTS disease_alternative_name (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL UNIQUE,
      disease_id INT NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY (disease_id)
       REFERENCES disease_data (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE

    )
    
    `,
  `
    CREATE TABLE IF NOT EXISTS patient_disease_data (
    id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id  INT,
    disease_name VARCHAR(50) NOT NULL,
    bp VARCHAR(45) NULL,
    pulse VARCHAR(45) NULL,
    temp VARCHAR(45) NULL,
    heart VARCHAR(45) NULL,
    lungs VARCHAR(45) NULL,
    abd VARCHAR(45) NULL,
    anaemia VARCHAR(45) NULL,
    jaundice VARCHAR(45) NULL,
    cyanosis VARCHAR(45) NULL,
    oedema VARCHAR(45) NULL,
    se_nervousSystem VARCHAR(45) NULL,
    se_respiratorySystem VARCHAR(45) NULL,
    se_cvs VARCHAR(45) NULL,
    se_alimentarySystem VARCHAR(45) NULL,
    se_musculoskeletalSystem VARCHAR(45) NULL,
    specialNote TEXT NULL,
    cc TEXT,
    investigation TEXT,
    advice TEXT,
    counselling TEXT, 
    medicine TEXT,
    PRIMARY KEY (id));
    `,
  `
  CREATE TABLE IF NOT EXISTS generic_drug_data (
    id INT NOT NULL AUTO_INCREMENT,
    generic_name VARCHAR(50) NOT NULL UNIQUE,
    dose_range TEXT,
    dose_weight TEXT,
    dose_drug_interection TEXT,
    dose_indication TEXT,
    dose_constrains TEXT,
    dose_precautions_warnings TEXT,
    dose_pregnency_category TEXT,
    PRIMARY KEY (id)
  )
  `,

`
CREATE TABLE IF NOT EXISTS trade_drug_data (
  id INT NOT NULL AUTO_INCREMENT,
  trade_name VARCHAR(50) NOT NULL UNIQUE,
  company_name VARCHAR(50),
  generic_name_id INT NOT NULL,
  price INT,
  PRIMARY KEY (id),
  FOREIGN KEY (generic_name_id)
  REFERENCES generic_drug_data (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
)
`,


  `
  CREATE TABLE IF NOT EXISTS admin_user (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
  )
  `
];

initScripts.forEach((sql) => {
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});

const fs = require("fs");

let writeData = "";

initScripts.forEach((s) => {
  writeData += s;
});

fs.writeFile("db.sql", writeData, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log("Successfull");
  }
});
