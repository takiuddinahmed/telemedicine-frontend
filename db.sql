CREATE TABLE IF NOT EXISTS cc_template (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS dose_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS duration_list (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
)

    CREATE TABLE IF NOT EXISTS investigation (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
    )
    
    CREATE TABLE IF NOT EXISTS advice (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
    )
    CREATE TABLE IF NOT EXISTS counselling (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
    )
    
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

    se_nervous_system_palpation VARCHAR(45),
    se_nervous_system_inspection VARCHAR(45),
    se_nervous_system_percussion VARCHAR(45),
    se_nervous_system_auscultation VARCHAR(45),

    se_cvs_palpation VARCHAR(45),
    se_cvs_inspection VARCHAR(45),
    se_cvs_percussion VARCHAR(45),
    se_cvs_auscultation VARCHAR(45),

    se_alimentary_system_palpation VARCHAR(45),
    se_alimentary_system_inspection VARCHAR(45),
    se_alimentary_system_percussion VARCHAR(45),
    se_alimentary_system_auscultation VARCHAR(45),

    se_musculoskeletal_system_palpation VARCHAR(45),
    se_musculoskeletal_system_inspection VARCHAR(45),
    se_musculoskeletal_system_percussion VARCHAR(45),
    se_musculoskeletal_system_auscultation VARCHAR(45),

    se_respiratory_system_palpation VARCHAR(45),
    se_respiratory_system_inspection VARCHAR(45),
    se_respiratory_system_percussion VARCHAR(45),
    se_respiratory_system_auscultation VARCHAR(45),
    
    special_note VARCHAR(45) NULL,
    cc VARCHAR(50),
    investigation VARCHAR(50),
    advice VARCHAR(50),
    counselling VARCHAR(50), 
    
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

    )
    
    
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

    se_nervous_system_palpation VARCHAR(45),
    se_nervous_system_inspection VARCHAR(45),
    se_nervous_system_percussion VARCHAR(45),
    se_nervous_system_auscultation VARCHAR(45),

    se_cvs_palpation VARCHAR(45),
    se_cvs_inspection VARCHAR(45),
    se_cvs_percussion VARCHAR(45),
    se_cvs_auscultation VARCHAR(45),

    se_alimentary_system_palpation VARCHAR(45),
    se_alimentary_system_inspection VARCHAR(45),
    se_alimentary_system_percussion VARCHAR(45),
    se_alimentary_system_auscultation VARCHAR(45),

    se_musculoskeletal_system_palpation VARCHAR(45),
    se_musculoskeletal_system_inspection VARCHAR(45),
    se_musculoskeletal_system_percussion VARCHAR(45),
    se_musculoskeletal_system_auscultation VARCHAR(45),

    se_respiratory_system_palpation VARCHAR(45),
    se_respiratory_system_inspection VARCHAR(45),
    se_respiratory_system_percussion VARCHAR(45),
    se_respiratory_system_auscultation VARCHAR(45),
    
    special_note VARCHAR(45) NULL,
    cc VARCHAR(50),
    investigation VARCHAR(50),
    advice VARCHAR(50),
    counselling VARCHAR(50), 
    PRIMARY KEY (id)
  )
  
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

  CREATE TABLE IF NOT EXISTS admin_user (
    id INT NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
  )
  