const db = require("./db");

const initScripts = [
  `CREATE TABLE IF NOT EXISTS cc_template (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    details MEDIUMTEXT NOT NULL,
    PRIMARY KEY (id)
);
`,
  `
CREATE TABLE IF NOT EXISTS dose_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
`,
  `
CREATE TABLE IF NOT EXISTS duration_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
`,
  `
    CREATE TABLE IF NOT EXISTS investigation (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      details MEDIUMTEXT NOT NULL,
      PRIMARY KEY (id)
    );
    `,
  `
    CREATE TABLE IF NOT EXISTS advice (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      details MEDIUMTEXT NOT NULL,
      PRIMARY KEY (id)
    );
    `,
  `CREATE TABLE IF NOT EXISTS counselling (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      details MEDIUMTEXT NOT NULL,
      PRIMARY KEY (id)
    );
    `,
  `
    CREATE TABLE IF NOT EXISTS disease_data (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    alternative_name TEXT,
    doctor_id INT DEFAULT -1,
    bp VARCHAR(45)  DEFAULT "Absent",
    pulse VARCHAR(45)  DEFAULT "Absent",
    temp VARCHAR(45)  DEFAULT "Absent",
    heart VARCHAR(45)  DEFAULT "Absent",
    lungs VARCHAR(45)  DEFAULT "Absent",
    abd VARCHAR(45)  DEFAULT "Absent",
    anaemia VARCHAR(45)  DEFAULT "Absent",
    jaundice VARCHAR(45)  DEFAULT "Absent",
    cyanosis VARCHAR(45)  DEFAULT "Absent",
    oedema VARCHAR(45)  DEFAULT "Absent",

    se_nervous_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_nervous_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_nervous_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_nervous_system_auscultation VARCHAR(45) DEFAULT "Absent",

    se_cvs_palpation VARCHAR(45) DEFAULT "Absent",
    se_cvs_inspection VARCHAR(45) DEFAULT "Absent",
    se_cvs_percussion VARCHAR(45) DEFAULT "Absent",
    se_cvs_auscultation VARCHAR(45) DEFAULT "Absent",

    se_alimentary_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_alimentary_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_alimentary_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_alimentary_system_auscultation VARCHAR(45) DEFAULT "Absent",

    se_musculoskeletal_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_musculoskeletal_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_musculoskeletal_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_musculoskeletal_system_auscultation VARCHAR(45) DEFAULT "Absent",

    se_respiratory_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_respiratory_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_respiratory_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_respiratory_system_auscultation VARCHAR(45) DEFAULT "Absent" ,
    
    fixed_data TEXT,


    special_note TEXT DEFAULT "Absent",
    cc MEDIUMTEXT,
    drug MEDIUMTEXT,
    investigation MEDIUMTEXT,
    advice MEDIUMTEXT,
    counselling MEDIUMTEXT,
    medicine MEDIUMTEXT,


    PRIMARY KEY (id));
    `,
    `
    CREATE TABLE IF NOT EXISTS patient_disease_data(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    patient_id INT NOT NULL UNIQUE,
    doctor_id INT DEFAULT -1,
    doctor_name VARCHAR(45) NOT NULL,
    date VARCHAR(20) NOT NULL,
    bp VARCHAR(45)  DEFAULT "Absent",
    pulse VARCHAR(45)  DEFAULT "Absent",
    temp VARCHAR(45)  DEFAULT "Absent",
    heart VARCHAR(45)  DEFAULT "Absent",
    lungs VARCHAR(45)  DEFAULT "Absent",
    abd VARCHAR(45)  DEFAULT "Absent",
    anaemia VARCHAR(45)  DEFAULT "Absent",
    jaundice VARCHAR(45)  DEFAULT "Absent",
    cyanosis VARCHAR(45)  DEFAULT "Absent",
    oedema VARCHAR(45)  DEFAULT "Absent",

    se_nervous_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_nervous_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_nervous_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_nervous_system_auscultation VARCHAR(45) DEFAULT "Absent",

    se_cvs_palpation VARCHAR(45) DEFAULT "Absent",
    se_cvs_inspection VARCHAR(45) DEFAULT "Absent",
    se_cvs_percussion VARCHAR(45) DEFAULT "Absent",
    se_cvs_auscultation VARCHAR(45) DEFAULT "Absent",

    se_alimentary_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_alimentary_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_alimentary_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_alimentary_system_auscultation VARCHAR(45) DEFAULT "Absent",

    se_musculoskeletal_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_musculoskeletal_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_musculoskeletal_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_musculoskeletal_system_auscultation VARCHAR(45) DEFAULT "Absent",

    se_respiratory_system_palpation VARCHAR(45) DEFAULT "Absent",
    se_respiratory_system_inspection VARCHAR(45) DEFAULT "Absent",
    se_respiratory_system_percussion VARCHAR(45) DEFAULT "Absent",
    se_respiratory_system_auscultation VARCHAR(45) DEFAULT "Absent",

	  fixed_data TEXT,
	
    special_note TEXT DEFAULT "Absent",
    cc TEXT,
    drug MEDIUMTEXT,
    investigation MEDIUMTEXT,
    advice MEDIUMTEXT,
    counselling MEDIUMTEXT,
    medicine MEDIUMTEXT,

    PRIMARY KEY(id));
    
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

    );
    
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
    dose_warning_condition TEXT,
    advice MEDIUMTEXT,
    PRIMARY KEY (id)
  );
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
);
`,


  `
  CREATE TABLE IF NOT EXISTS admin_user (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
  );
  `,

  `
  CREATE TABLE IF NOT EXISTS prescription_header(
    id INT NOT NULL AUTO_INCREMENT,
    doctor_id INT NOT NULL UNIQUE,
    name varchar(40) NOT NULL,
    degree varchar(50),
    speciality varchar(50),
    department varchar(50),
    institute varchar(100),
    reg_details varchar(50),


    chember_place_name varchar(50),
    chember_place_address varchar(100),
    chember_contact varchar(100),
    chember_visit_time varchar(100),
    chember_special_note varchar(100),

    background_color varchar(20),
    font_color varchar(20),

    PRIMARY KEY(id)

  );
  
  `,

  `
  CREATE TABLE IF NOT EXISTS previous_presciptions(
    id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL, 
    doctor_id INT NOT NULL,
    doctor_name VARCHAR(40),
    prescription_details MEDIUMTEXT,
    date varchar(20),
    PRIMARY KEY(id)
  );

  `,
  `
   CREATE TABLE IF NOT EXISTS doctor_drug_entry(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    duration VARCHAR(30),
    dose VARCHAR(30),
    time VARCHAR(40),
    PRIMARY KEY(id)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS patient_drug_history(
    id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL UNIQUE,
    drug_history TEXT,
    PRIMARY KEY(id)
  );
  `
];

initScripts.forEach((sql) => {
  console.log(sql);
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
