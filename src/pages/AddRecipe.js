/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati <pr455456@dal.ca>
 * @author Anisha Shah <an220066@dal.ca>
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "./Footer_black";
import { Redirect } from "react-router-dom";
import url from "../default";
import axios from "axios";

class AddRecipe extends Component {
  state = {
    ingredientList: [],
    counter: 0,
    selectedFile: null,
    recipeType: "",
  };

  saveRecipeDetails = async () => {
    // console.log("Inside save recipe method");
    // console.log(this.state.ingredientList);
    let { value: recipename } = this.recipename;
    let { value: recipevideo } = this.recipevideo;
    let { value: description } = this.description;
    let filename = this.filename.files[0];
    let temp = 0;
    if (
      recipename === "" &&
      recipevideo === "" &&
      description === "" &&
      filename === undefined &&
      this.state.ingredientList.length === 0 &&
      (this.state.recipeType === "Please select a recipe type" ||
        this.state.recipeType === "")
    ) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please all the required details",
      });
    } else if (recipename === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please enter recipe name",
      });
    } else if (recipevideo === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please enter recipe video url",
      });
    } else if (description === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please enter recipe description",
      });
    } else if (filename === undefined) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please upload recipe image",
      });
    } else if (this.state.ingredientList.length === 0) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please add ingridents to the recipe section",
      });
    } else if (
      this.state.recipeType === "Please select a recipe type" ||
      this.state.recipeType === ""
    ) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please select recipe type",
      });
    } else {
      await axios({
        method: "post",
        url: `${url}/api/recipes/addRecipe`,
        data: {
          title: recipename,
          url: recipevideo,
          description: description,
          cardDescription: description.substring(0, 97) + "...",
          type: this.state.recipeType,
          ingredients: this.state.ingredientList,
          createdOn: new Date(),
          updatedOn: new Date(),
          userId: sessionStorage.getItem("id"),
        },
      })
        .then((res) => {
          temp = 1;
        })
        .catch((err) => {
          // console.log(err);
        });
      if (temp !== 0) {
        this.setState({ status: "Success" });
        this.setState({ errorMessage: "Recipe Added Successfully" });
        setTimeout(() => {
          this.setState({ recipestatus: "true" });
        }, 1500);
      }
    }
  };

  addIngredient = async () => {
    let { value: ivalue } = this.ingredient;
    let { value: qvalue } = this.quantity;
    let calories = 0;

    await axios({
      method: "get",
      url: `${url}/api/recipes/calories`,
      headers: {
        ivalue: ivalue,
        qvalue: qvalue,
      },
    })
      .then((res) => {
        calories = res.data.calories;
      })
      .catch((err) => {});

    this.state.ingredientList.push({
      ingredient: ivalue,
      quantity: qvalue,
      calorie: calories,
    });
    this.setState({ counter: this.state.counter + 1 });
    // console.log(this.state.ingredientList);
  };

  fileSelectedHandler = (event) => {
    event.preventDefault();
    var imgA;
    let { value: recipename } = this.recipename;
    // console.log(event.target.files[0]);

    let file = event.target.files[0];
    let filename = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      imgA = reader.result;
      axios
        .post(`${url}/api/recipes/addRecipeImage`, {
          title: recipename,
          img: reader.result,
        })
        .then((res) => {
          // console.log("successfull");
        })
        .catch((err) => {
          this.setState({ status: "Failed" });
          this.setState({ errorMessage: "Image size cannot exceed 50kb" });
          setTimeout(() => {
            this.setState({ recipestatus: "true" });
          }, 1500);
        });
    };
  };
  typeSelectHandler = (e) => {
    this.setState({
      recipeType: e.target.value,
    });
    // console.log(this.state.recipeType);
  };
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "false" ? (
          <Redirect to="/login" />
        ) : null}
        {this.state.recipestatus === "true" ? <Redirect to="/recipes" /> : null}
        <Header />
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <form>
            <div
              className="row mx-auto"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3>Add Recipe</h3>
            </div>
            <div className="row">
              <div
                className="col-sm-6 col-md-6 col-lg-6"
                style={{ padding: "30px" }}
              >
                {this.state.status === "Success" ? (
                  <div className="alert alert-success " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : this.state.status === "Failure" ? (
                  <div className="alert alert-danger " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : null}
                <h3>Recipe Name:</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="recipename"
                    required
                    placeholder="Enter your recipe name"
                    ref={(recipename) => {
                      this.recipename = recipename;
                    }}
                  />
                </div>
                <h3>Recipe Video Url:</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="recipevideo"
                    required
                    placeholder="Enter your recipe video url"
                    ref={(recipevideo) => {
                      this.recipevideo = recipevideo;
                    }}
                  />
                </div>
                <h3>Recipe Type:</h3>
                <div className="form-group">
                  <select
                    class="form-control"
                    onChange={this.typeSelectHandler}
                  >
                    <option>Please select a recipe type</option>
                    <option>veg</option>
                    <option>non-veg</option>
                    <option>vegan</option>
                  </select>
                </div>
                <h3>Recipe Description:</h3>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="9"
                    placeholder="Description"
                    required
                    ref={(description) => {
                      this.description = description;
                    }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <h3>Upload Photo:</h3>
                  <input
                    type="file"
                    className="form-control-file"
                    id="filename"
                    required
                    onChange={this.fileSelectedHandler}
                    ref={(filename) => {
                      this.filename = filename;
                    }}
                  />
                </div>
              </div>
              <div
                className="col-sm-6 col-md-6 col-lg-6"
                style={{ padding: "30px" }}
              >
                <h3>Add Ingredients:</h3>
                <div className="row">
                  <div className="form-group col-4">
                    <input
                      type="text"
                      className="form-control"
                      id="ingredient"
                      placeholder="Ingredient Name"
                      ref={(ingredient) => {
                        this.ingredient = ingredient;
                      }}
                    />
                  </div>
                  <div className="form-group col-4">
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      placeholder="Quantity (g)"
                      ref={(quantity) => {
                        this.quantity = quantity;
                      }}
                    />
                  </div>
                  <div className="form-group col-4">
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="button-search"
                      onClick={this.addIngredient}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ height: "35vh", overflow: "auto" }}
                >
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Quantity (g)</th>
                        <th scope="col">Calorie (cal)</th>
                      </tr>
                    </thead>
                    {this.state.ingredientList.length >= 0 ? (
                      <tbody>
                        {this.state.ingredientList.map((r) => (
                          <tr>
                            <td>{r.ingredient}</td>
                            <td>{r.quantity}</td>
                            <td>{r.calorie}</td>
                          </tr>
                        ))}
                      </tbody>
                    ) : null}
                  </table>
                </div>
                <div className="row" style={{ marginTop: "5vh" }}>
                  <div
                    className="col-6"
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <button className="btn btn-primary">Clear All</button>
                  </div>
                  <div
                    className="col-6"
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.saveRecipeDetails}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddRecipe;
