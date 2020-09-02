import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import PageNotFound from "./pages/PageNotFound";
import Workouts from "./pages/Workouts";
import AddWorkout from "./pages/AddWorkout";
import AddRecipe from "./pages/AddRecipe";
import MyUploads from "./pages/MyUploads";
import ViewRecipe from "./pages/ViewRecipe/ViewRecipe";
import ViewWorkout from "./pages/ViewWorkout/ViewWorkout";
import GymLocator from "./pages/GymLocator";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import Support from "./pages/Support";
import Blog from "./pages/Blog/Blog";
import ChangePassword from "./pages/ChangePassword";
import NewPassword from "./pages/NewPassword";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/recipes" exact component={Recipes} />
        <Route path="/workouts" exact component={Workouts} />
        <Route path="/addworkout" exact component={AddWorkout} />
        <Route path="/login" exact component={Login} />
        <Route path="/notfound" exact component={PageNotFound} />
        <Route path="/addrecipe" exact component={AddRecipe} />
        <Route path="/myuploads" exact component={MyUploads} />
        <Route path="/gymlocator" exact component={GymLocator} />
        <Route path="/viewrecipe" exact component={ViewRecipe} />
        <Route path="/viewworkout" exact component={ViewWorkout} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/changepassword" exact component={ChangePassword} />
        <Route path="/newpassword/:id" exact component={NewPassword} />
        <Route path="/support" exact component={Support} />
        {/* <Route path="/blogs" exact component={Blog} /> */}
        <Route path="/news" exact component={News} />
        <Route path="/faq" exact component={FAQ} />
        <Route path="/contactus" exact component={ContactUs} />
        <Redirect to="/notfound" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
