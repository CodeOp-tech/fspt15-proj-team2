require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "INSERT DATABASE NAME HERE", // ADD NAME OF DATABASE FOR PROJECT HERE
  multipleStatements: true,
});

// REVISE SQL TO REFLECT GROUP PROJECT -- THIS CODE IS FROM CRYSTAL'S MVP
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = `DROP TABLE if exists MyLibrary; CREATE TABLE MyLibrary (
     id int NOT NULL AUTO_INCREMENT,
     bookId varchar(40),
     rating int,
     review varchar(255),
      PRIMARY KEY (id)
  );`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `MyLibrary` was successful!");
    console.log("Closing...");
  });
  con.end();
});
