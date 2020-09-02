/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

const mongoose = require("mongoose");

//defining collection for user profile management
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipelikedVideos: [
    {
      videoId: String,
    },
  ],
});

//exporting the schema as userdetails
module.exports = mongoose.model("userdetails", userSchema);
