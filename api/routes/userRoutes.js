/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 * @author Praneeth Nuthalapati <pr455456@dal.ca>
 */

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const router = express.Router();
//getting the usermodel
const UserModel = require("../models/userModel");
//declared md5 variable for encryption (i.e. for password)
const md5 = require("md5");

//getting the user profile using id
router.get("/id", (req, res) => {
  if (req.header("id")) {
    UserModel.find({ _id: req.header("id") })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({
          error: "No Result Found",
        });
      });
  } else {
    res.redirect("/notfound");
  }
});

//getting the user profile using email
router.get("/email", (req, res) => {
  if (req.header("email")) {
    UserModel.find({ email: req.header("email") })
      .then((result) => {
        console.log(result);
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({
          error: "No Result Found",
        });
      });
  } else {
    res.redirect("/notfound");
  }
});

//adding a new user
router.post("/add", (req, res) => {
  const user = new UserModel({
    fullname: req.body.fullname,
    email: req.body.email,
    password: md5(req.body.password),
  });
  user
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Failure",
      });
    });
});

//reseting the password (i.e. changepassword & newpassword)
router.post("/reset", (req, res) => {
  UserModel.update({ _id: req.body.id }, { password: md5(req.body.password) })
    .then((result) => {
      res.status(200).json({
        message: "Password Reset Success",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Password Reset Not Successfull",
      });
    });
});

//updating profile
router.post("/profile", (req, res) => {
  UserModel.update(
    { _id: req.body.id },
    { fullname: req.body.fullname, email: req.body.email }
  )
    .then((result) => {
      res.status(200).json({
        message: "Profile Update Success",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Profile Update Not Successfull",
      });
    });
});

//Sending mail
router.post("/send", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "yahoo",
    port: 587,
    auth: {
      user: "food2fitness@yahoo.com",
      pass: "swjtzcwktwusosnm",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //email contents
  let mailOptions = {
    from: "food2fitness@yahoo.com",
    to: req.body.email,
    subject: req.body.esubject,
    html: `<h1>Food2Fitness</h1><h3>${req.body.emessage}</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});


//like a video
router.post("/addLike", (req, res) => {
  UserModel.updateOne(
    { _id: req.body.id },
    {
      recipelikedVideos: req.body.videoId,
    }
  )
    .then((result) => {
      return res.status(200).json({
        message: "Video Added to liked list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addLikeWorkout", (req, res) => {
  UserModel.updateOne(
    { _id: req.body.id },
    {
      workoutlikedVideos: req.body.videoId,
    }
  )
    .then((result) => {
      return res.status(200).json({
        message: "Video Added to liked list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get user data based on user ID
router.get("/:userId", (req, res) => {
  UserModel.find({ _id: req.params.userId })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
