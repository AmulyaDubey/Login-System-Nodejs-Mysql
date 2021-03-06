const db = require("../dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM users WHERE email=?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        return res.render("register", {
          error: "Email id is already in use.",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          error: "Passwords do not match",
        });
      }

      let hashed_password = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users SET ? ",
        {
          name,
          email,
          password: hashed_password,
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            return res.render("register", {
              message: "User registered",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).render("login", {
        error: "Please provide an email and password",
      });
    }
    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (err, results) => {
        console.log(results);
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          return res.status(401).render("login", {
            error: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/")
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
