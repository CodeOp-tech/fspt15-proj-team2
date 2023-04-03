SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS users_favorites; 
DROP TABLE IF EXISTS favorites;
SET foreign_key_checks = 1;

-- this is the information that we will ask for the registration (the email and username should be unique)
CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100)
); 
  
-- SQL query in users.js
-- INSERT INTO users (username, password, firstName, email) VALUES ("${username}", "${hashedPW}", "${firstName}", "${email}")
  
-- need to fetch the id from the podcast for this
CREATE TABLE favorites (
    id INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE users_favorites (
    user_id INTEGER NOT NULL,
    favorites_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (favorites_id) REFERENCES favorites(id) ON DELETE CASCADE
);