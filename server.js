const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const app = express();

//Routes Required
const userroutes = require("./api/routes/userRoutes");
const gymLocatorRoutes = require("./api/routes/gymLocatorRoutes");
const supportRoutes = require("./api/routes/supportRoutes");
const recipeRoutes = require("./api/routes/recipeRoutes");
const newsRoutes = require("./api/routes/newsRoutes");
const commentsRoutes= require('./api/routes/commentsRouter');
const workoutRoutes = require("./api/routes/workoutRoutes");

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

//Backend Routes
app.use("/api/user", userroutes);
app.use("/api/gym", gymLocatorRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/workout", workoutRoutes);

//Frontend Routes
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Database Connection
mongoose.connect(
  "mongodb+srv://admin:admin@food2fitness.hvljn.mongodb.net/food2fitness?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false }
)
  .then(() => console.log("MongoDB is connected"))
  .catch(err => console.error(err))

app.listen(port);
