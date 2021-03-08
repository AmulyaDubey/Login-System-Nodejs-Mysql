const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path= require('path')

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

const publicDirectory= path.join(__dirname, "./public")
app.set("view engine", "hbs")
app.use(express.static(publicDirectory)) // so that express uses the static files (css or js files)

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL connected!");
});

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/register", (req, res) => {
  res.render("register")
});

app.listen(5000, () => {
  console.log("Express server started on port 5000");
});
