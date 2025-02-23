const mysql = require("mysql2");
const dbConfig = require("./config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Woop Woop! Successfully connected to the database!");
});

module.exports = connection;