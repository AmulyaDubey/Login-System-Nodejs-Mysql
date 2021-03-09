const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser= require("cookie-parser")

const app = express(); //start the express server


dotenv.config({ path: "./.env" });
const db= require('./dbConfig')

const routes = require("./routes/pages");
const authRoutes = require("./routes/auth");

const publicDirectory = path.join(__dirname, "./public");
app.set("view engine", "hbs");
app.use(express.static(publicDirectory)); // so that express uses the static files (css or js files)
app.use(express.urlencoded({ extended: false })); //Parse URL encoded body as sent by html form
app.use(express.json()) //Parse JSON bodies(as sent by api client)
app.use(cookieParser)

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL connected!");
});

app.use("/", routes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Express server started on port 5000");
});
