/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati <pr455456@dal.ca>
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const WorkoutModel = require("../models/workout");

//Get all workouts
router.get("/getAllWorkouts", (req, res) => {
  let workoutLimit = parseInt(req.param("limit"));
  WorkoutModel.find()
    .limit(workoutLimit)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Adding new workout details: Add workout Feature
router.post("/addWorkout", (req, res) => {
  // console.log(req.body.ingredientList);
  WorkoutModel.update(
    { title: req.body.title },
    {
      description: req.body.description,
      cardDescription: req.body.cardDescription,
      url: req.body.url,
      createdOn: req.body.createdOn,
      updatedOn: req.body.updatedOn,
      userId: req.body.userId,
    }
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Adding new workout details: Add workout Feature
router.post("/addWorkoutImage", (req, res) => {
  // var data = base64Img.base64Sync(req.body.img);
  const workotDetails = new WorkoutModel({
    title: req.body.title,
    img: req.body.img,
  });
  workotDetails
    .save()
    .then((result) => {
      console.log(result._id);
      res.status(200).json({
        message: "Success",
        img: req.body.img,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Failure",
      });
    });
});

//Edit workout details: update Workout details
router.post("/editWorkout", (req, res) => {
  WorkoutModel.update(
    { _id: req.body.id },
    { title: req.body.title, description: req.body.description }
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get Specific Workout By Id
router.post("/id", (req, res) => {
  WorkoutModel.find({ _id: req.body.id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteWorkout/id", (req, res) => {
  WorkoutModel.remove({ _id: req.body.id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all workouts by user id
router.post("/getWorkout/userid", (req, res) => {
  WorkoutModel.find({ userId: req.body.userid })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
