const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

const app = express(); //start the express server

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  //connect with database
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: 8889,
});

app.set("view engine", "hbs")

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL connected!");
});

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(5000, () => {
  console.log("Express server started on port 5000");
});
