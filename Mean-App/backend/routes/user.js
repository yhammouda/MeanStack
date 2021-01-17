const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => { /* bcrypt to save hash the password before saving it */
    const user = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({ /* return invalid credentials*/
          message: "Invalid authentication credentials!"
        });
      });
  });
});

router.post("/login", (req, res, next) => { /* login api that takes email and password as body paramters*/
  let fetchedUser;
  User.findOne({ email: req.body.email }) /* find one fetsh on mongo DB */
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign( /* create token */
        { email: fetchedUser.email, userId: fetchedUser._id ,firstname: fetchedUser.firstname,lastname: fetchedUser.lastname },
        "secret_this_should_be_longer",
        { expiresIn: "1h" } /*  token expire on 3600 seconds */
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        firstname: fetchedUser.firstname,
        lastname: fetchedUser.lastname
      });
    })
    .catch(err => {
      return res.status(401).json({ /*  returrn 401 unauthorized*/
        message: "Invalid authentication credentials!"
      });
    });
});

module.exports = router;
