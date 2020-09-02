/**
 * @author Punarva Vyas <pn605302@dal.ca>
 */


const mongoose = require("mongoose");

//defining schema for the support functionality
const supportSchema = new mongoose.Schema({
    userEmailId: {
      type: String,
      required: true,
    },
    userQuery: {
      type: String,
      required: true,
    },
  });
  
  //exporting the schema as support details
  module.exports = mongoose.model("supportdetails", supportSchema);