/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati<pr455456@dal.ca>
 * @author Anisha Shah <an220066@dal.ca>
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetchUrl = require("fetch").fetchUrl;
const RecipeModel = require("../models/recipes");

//Get all recipes
router.get("/getAllRecipes", (req, res) => {
  let recipeLimit = parseInt(req.param("limit"));
  RecipeModel.find()
    .limit(recipeLimit)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Adding new recipe details: Add Recipe Feature
router.post("/addRecipe", (req, res) => {
  // console.log(req.body.ingredientList);
  RecipeModel.update(
    { title: req.body.title },
    {
      type: req.body.type,
      cardDescription: req.body.cardDescription,
      description: req.body.description,
      ingredients: req.body.ingredients,
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

//Adding new recipe details: Add Recipe Feature
router.post("/addRecipeImage", (req, res) => {
  const recipeDetails = new RecipeModel({
    title: req.body.title,
    img: req.body.img,
  });
  recipeDetails
    .save()
    .then((result) => {
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

//Edit recipe details: update Recipe details
router.post("/editRecipe", (req, res) => {
  RecipeModel.update(
    { _id: req.body.id },
    { title: req.body.title,
      description: req.body.description 
    }
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get Specific Recipe By Id
router.post("/id", (req, res) => {
  RecipeModel.find({ _id: req.body.id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteRecipe/id", (req, res) => {
  RecipeModel.remove({ _id: req.body.id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all recipes by user id
router.post("/getRecipes/userid", (req, res) => {
  RecipeModel.find({ userId: req.body.userid })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Calculating calories using api
router.get("/calories", (req, res) => {
  if (req.header("ivalue") && req.header("qvalue")) {
    let ivalue = req.header("ivalue");
    let qvalue = req.header("qvalue");
    fetchUrl(
      `https://api.edamam.com/api/nutrition-data?app_id=7d55614c&app_key=34b57247bbfa3d39eb6a41056877201f&ingr=${qvalue}g%20${ivalue}`,
      function (error, meta, body) {
        if (error) {
          console.log(error);
        } else {
          let value = JSON.parse(body.toString());
          res.status(200).json(value);
        }
      }
    );
  } else {
    res.redirect("/notfound");
  }
});

module.exports = router;
