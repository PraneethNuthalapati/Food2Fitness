/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati  <pr455456@dal.ca>
 */
const mongoose = require("mongoose");

//defining collection for recipe feature
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
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
  img: {
    type: String
  },
  userId:
    {
      type: String,
    },
  ingredients: [
    {
      ingredient: String,
      quantity: String,
      calorie: String
  },
]
});

//exporting the schema as recipes
module.exports = mongoose.model("recipes", recipeSchema);
