/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati  <pr455456@dal.ca>
 */

const mongoose = require("mongoose");

//defining collection for workout feature
const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  cardDescription: {
    type: String,
  },
  createdOn: {
    type: String,
  },
  updatedOn: {
    type: String,
  },
  url: {
    type: String,
  },
  userId: {
    type: String,
  },
});

//exporting the schema as workout
module.exports = mongoose.model("workout", workoutSchema);
