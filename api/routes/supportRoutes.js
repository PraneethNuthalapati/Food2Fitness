/**
 * @author Punarva Vyas <pn605302@dal.ca>
 */


const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const router = express.Router();

const supportModel = require("../models/support");

// for storing the user query
router.post("/addquery", (req, res) => {
    const support = new supportModel({
      userEmailId: req.body.email,
      userQuery: req.body.userQuery,
    });
    support
      .save()
      .then((result) => {
        console.log(result._id);
        res.status(200).json({
          message: "Success",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Failure",
        });
      });
  });


  //for sending the mail
  router.post("/sendmail", (req, res) => {
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
      html: `<h1>Food2Fitness</h1><h3>Thankyou for submitting the query. Our representative will get back to you soon.</h3>`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

  module.exports = router;
