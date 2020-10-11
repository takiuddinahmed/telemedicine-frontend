
    CREATE TABLE IF NOT EXISTS cc_template (
      cc_id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      PRIMARY KEY (cc_id)
    )
    
    CREATE TABLE IF NOT EXISTS drug_database (
      drug_id INT NOT NULL AUTO_INCREMENT,
      rx VARCHAR(50) NOT NULL,
      generic VARCHAR(50) NOT NULL,
      drug_interection VARCHAR(50) NOT NULL DEFAULT 'no',
      pregnancy_category VARCHAR(50) NOT NULL DEFAULT 'no',
      description TEXT;
      PRIMARY KEY (drug_id)
    )
    
    CREATE TABLE IF NOT EXISTS dose_list (
      dose_id INT NOT NULL AUTO_INCREMENT,
      dose VARCHAR(50) NOT NULL,
      PRIMARY KEY (dose_id)
    )
    
    CREATE TABLE IF NOT EXISTS duration_list (
      duration_id INT NOT NULL AUTO_INCREMENT,
      duration VARCHAR(50) NOT NULL,
      PRIMARY KEY (duration_id)
    )
    
    
    