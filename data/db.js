const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("db connected");
});

module.exports = connection;
