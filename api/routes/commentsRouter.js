/**
 * @author Praneeth Nuthalapati  <pr455456@dal.ca>
 */

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const CommentsModel = require("../models/commentsModel");



//Get API to fetch the comments related to each video
router.get("/:videoId", (req, res)=> {
    CommentsModel.find({videoId: req.params.videoId}) //Video ID is passed as param
    .then(commentList => {
        // console.log(commentList);
        return res.status(200).json(commentList);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST API to add a cooment into the Mongo DB.
router.post("/addComment", (req, res, next) => {
  const comment = new CommentsModel({
    _id: new mongoose.Types.ObjectId(), // generates new unique Id for each record
    videoId: req.body.videoId, //takes value from form data
    userId: req.body.userId, // takes value from form data
    comment: req.body.comment,// takes value from form data
    commentDate: req.body.commentDate // takes value from form data
  });
  //saving the data in database and logging it
  comment
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "Comment added to database",
  });
});

module.exports = router;