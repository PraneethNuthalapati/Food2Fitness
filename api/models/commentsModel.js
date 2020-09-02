/**
 * @author Praneeth Nuthalapati  <pr455456@dal.ca>
 */

const mongoose = require('mongoose');


//defining the schema for the collection 'comments'
const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // mongoose Type objectId is used for generating unique ID's
    videoId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    commentDate: {
        type: String,
        required: true
    },
    
});

//exporting the schema as comments
module.exports = mongoose.model("comments", commentSchema);