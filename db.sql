CREATE TABLE IF NOT EXISTS cc_template (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    details MEDIUMTEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dose_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS duration_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

    CREATE TABLE IF NOT EXISTS investigation (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      details MEDIUMTEXT NOT NULL,
      PRIMARY KEY (id)
    );
    
    CREATE TABLE IF NOT EXISTS advice (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      details MEDIUMTEXT NOT NULL,
      PRIMARY KEY (id)
    );
    CREATE TABLE IF NOT EXISTS counselling (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      details MEDIUMTEXT NOT NULL,
      PRIMARY KEY (id)
    );
    
    CREATE TABLE IF NOT EXISTS disease_data (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
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
    
    special_note TEXT DEFAULT "Absent",
    cc TEXT,
    investigation MEDIUMTEXT,
    advice MEDIUMTEXT,
    counselling MEDIUMTEXT, 

    PRIMARY KEY (id));
    
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
    cc MEDIUMTEXT,
    investigation MEDIUMTEXT,
    advice MEDIUMTEXT,
    counselling MEDIUMTEXT, 
    medicine MEDIUMTEXT,
    PRIMARY KEY (id));
    
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
    PRIMARY KEY (id)
  );
  
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

  CREATE TABLE IF NOT EXISTS admin_user (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
  );
  
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
  
  