/**
 * @author Sai Pavan Akuralapu  <sp536952@dal.ca>
 */

const mongoose = require('mongoose')

const gymLocationsSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    address:{
        street:{
            type: String,
            trim: true,
        },
        city:{
            type: String,
            trim:true
            
        },
        province:{
            type:String,
            trim:true
        },  
        postalCode: {
            type: String,
            trim: true
        }
        
    },
    link:{
        type: String       
    },
    coords:[Number]
})


const gymLocations = mongoose.model('gymLocations', gymLocationsSchema)

module.exports=gymLocations