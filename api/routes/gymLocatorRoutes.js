/**
 * @author Sai Pavan Akuralapu  <sp536952@dal.ca>
 */

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const gymLocationsModel = require("../models/gymLocations");
// post api for saving gym locations
router.post('/gymLocations',(req,res)=>{
    const gymLocations=new gymLocationsModel(req.body)
    gymLocations.save().then(()=>{
        res.status(201).send(gymLocations)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
// get api for getting all the nearby gym locations
router.get('/gymLocations',async (req,res)=>{
    console.log('inside get')
    try{
        const gymLocations=await gymLocationsModel.find({})
        res.status(200).send(gymLocations)
    }
    catch{
        res.status(500).send(e)
    }
})

module.exports = router;
