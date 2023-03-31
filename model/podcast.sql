SET foreign_key_checks = 0;
  DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS users_favorites; DROP TABLE IF EXISTS favorites;
  SET foreign_key_checks = 1;

-- this is the information that we will ask for the registration
CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
); 
  
CREATE TABLE favorites (
    
);

CREATE TABLE users_favorites (
    user_id 
);