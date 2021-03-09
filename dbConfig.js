const mysql = require("mysql");

const db = mysql.createConnection({
  //connect with database
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: 8889,
});

module.exports= db 