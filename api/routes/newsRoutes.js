/**
 * @author Anisha Shah <an220066@dal.ca>
 */

const express = require("express");
const fetchUrl = require("fetch").fetchUrl;
const router = express.Router();

//Getting top-news from news api
router.get("/trending", (req, res) => {
  if (req.header("country")) {
    let country = req.header("country");
    fetchUrl(
      `https://newsapi.org/V2/top-headlines?q=health&language=en&country=${country}&apikey=8dbc26859d1147ac890acb037e032979`,
      function (error, meta, body) {
        if (error) {
          console.log(error);
        } else {
          let value = JSON.parse(body.toString());
          res.status(200).json(value.articles);
        }
      }
    );
  } else {
    res.redirect("/notfound");
  }
});

//Getting all news from news api
router.get("/allnews", (req, res) => {
  if (req.header("category") && req.header("page")) {
    let category = req.header("category");
    let page = req.header("page");
    fetchUrl(
      `https://newsapi.org/V2/everything?q=${category}&language=en&page=${page}&apikey=8dbc26859d1147ac890acb037e032979`,
      function (error, meta, body) {
        if (error) {
          console.log(error);
        } else {
          let value = JSON.parse(body.toString());
          res.status(200).json(value.articles);
        }
      }
    );
  } else {
    res.redirect("/notfound");
  }
});

module.exports = router;
