import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom_css/Home.css";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class MyUploads extends Component {
  state = {
    recipeMongoList: [],
    workoutMongoList: [],
    recipeId: 0,
    workoutId: 0,
    openId: 0,
  };

  componentDidMount = async () => {
    let id = sessionStorage.getItem("id");
    // console.log(id);
    await axios({
      method: "post",
      url: `${url}/api/recipes/getRecipes/userid`,
      data: {
        userid: id,
      },
    })
      .then((res) => {
        const recipeResponse = res.data;
        this.setState({ recipeMongoList: recipeResponse });
      })
      .catch((err) => {
        // console.log(err);
      });

    await axios({
      method: "post",
      url: `${url}/api/workout/getWorkout/userid`,
      data: {
        userid: id,
      },
    })
      .then((res) => {
        const workoutResponse = res.data;
        this.setState({ workoutMongoList: workoutResponse });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  openworkout = async (idPassed) => {
    this.setState({ openId: idPassed });
    this.setState({ workoutId: idPassed });
    this.setState({ recipeState: false });
    this.setState({ workoutState: true });
    let temp = [];
    await axios({
      method: "post",
      url: `${url}/api/workout/id`,
      data: {
        id: idPassed,
      },
    })
      .then((res) => {
        temp = res.data;
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    if (temp.length !== 0) {
      this.description.value = temp[0].description;
    }
  };

  openRecipe = async (idPassed) => {
    this.setState({ openId: idPassed });
    this.setState({ recipeId: idPassed });
    this.setState({ recipeState: true });
    this.setState({ workoutState: false });
    let temp = [];

    await axios({
      method: "post",
      url: `${url}/api/recipes/id`,
      data: {
        id: idPassed,
      },
    })
      .then((res) => {
        temp = res.data;
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });

    if (temp.length !== 0) {
      this.recdescription.value = temp[0].description;
    }
  };

  deleteRecipe = async (idPassed) => {
    await axios({
      method: "post",
      url: `${url}/api/recipes/deleteRecipe/id`,
      data: {
        id: idPassed,
      },
    })
      .then((res) => {
        // temp = res.data;
        // alert("Recipe deleted successfully");
        window.location.reload(false);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  editRecipePost = async (idPassed, title) => {
    let { value: recdescription } = this.recdescription;
    // console.log(recdescription);
    // console.log(idPassed);
    // console.log(title);
    await axios({
      method: "post",
      url: `${url}/api/recipes/editRecipe`,
      data: {
        id: idPassed,
        description: recdescription,
        title: title,
      },
    })
      .then((res) => {
        this.setState({ status: "Success" });
        this.setState({ errorMessage: "Successfully Updated" });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  editPost = async (idPassed, title) => {
    let { value: description } = this.description;
    // console.log(description);
    // console.log(idPassed);
    // console.log(title);
    await axios({
      method: "post",
      url: `${url}/api/workout/editWorkout`,
      data: {
        id: idPassed,
        description: description,
        title: title,
      },
    })
      .then((res) => {
        this.setState({ status: "Success" });
        this.setState({ errorMessage: "Successfully Updated" });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  deleteWorkout = async (idPassed) => {
    await axios({
      method: "post",
      url: `${url}/api/workout/deleteWorkout/id`,
      data: {
        id: idPassed,
      },
    })
      .then((res) => {
        window.location.reload(false);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "false" ? (
          <Redirect to="/login" />
        ) : null}
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-sm-6 col-md-6 col-lg-6"
              style={{ padding: "30px" }}
            >
              <h3>My Uploads</h3>
              <div id="allworkouts">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-item nav-link active"
                      id="all_workouts_tab"
                      data-toggle="tab"
                      href="#nav-my-recipes"
                      role="tab"
                    >
                      My Recipes
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="trending_tab"
                      data-toggle="tab"
                      href="#nav-my-workouts"
                      role="tab"
                    >
                      My Workouts
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-my-recipes"
                    role="tabpanel"
                  >
                    <div style={{ height: "52vh", overflow: "auto" }}>
                      {this.state.recipeMongoList.map((r) => (
                        <div className="card mb-3" style={{ width: "100%" }}>
                          <div className="d-flex">
                            <div className="w-25">
                              <img
                                src={r.img}
                                className="img-custom"
                                alt="my_recipe_image"
                              />
                            </div>
                            <div className="w-75">
                              <div className="card-body">
                                <h5 className="card-title">{r.title}</h5>
                                <p className="card-text">{r.cardDescription}</p>
                                <div>
                                  <a href="#section1">
                                    <button
                                      className="btn-sm btn-primary"
                                      onClick={() => this.openRecipe(r._id)}
                                    >
                                      Read More
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-my-workouts"
                    role="tabpanel"
                  >
                    <div style={{ height: "52vh", overflow: "auto" }}>
                      {this.state.workoutMongoList.map((r) => (
                        <div className="card mb-3" style={{ width: "100%" }}>
                          <div className="d-flex">
                            <div className="w-25">
                              <img
                                src={r.img}
                                className="img-custom"
                                alt="my_workout_image"
                              />
                            </div>
                            <div className="w-75">
                              <div className="card-body">
                                <h5 className="card-title">{r.title}</h5>
                                <p className="card-text">{r.cardDescription}</p>
                                <div>
                                  <a href="#section1">
                                    <button
                                      className="btn-sm btn-primary"
                                      onClick={() => this.openworkout(r._id)}
                                    >
                                      Read More
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-sm-6 col-md-6 col-lg-6"
              style={{ padding: "30px" }}
              id="section1"
            >
              <h3>Currently Opened Post</h3>
              <div hidden={this.state.recipeState !== true ? true : false}>
                {this.state.openId !== 0 && this.state.recipeId !== 0
                  ? this.state.recipeMongoList.map((r) => {
                      if (r._id === this.state.openId) {
                        return (
                          <div
                            className="card"
                            style={{
                              width: "100%",
                              height: "60vh",
                              overflow: "auto",
                            }}
                          >
                            <img
                              className="card-img-top"
                              src={r.img}
                              alt="Card image cap"
                              style={{ height: "20vh", objectFit: "cover" }}
                            />
                            <div class="card-body">
                              <h5 class="card-title">Recipe Name: {r.title}</h5>
                              <p class="card-text">
                                <h5>Ingredients:</h5>
                                <table>
                                  <tr>
                                    <th>Ingredient</th>
                                    <th>Quantity</th>
                                    <th>Calories</th>
                                  </tr>
                                  {r.ingredients.map((item) => {
                                    return (
                                      <tr>
                                        <td>{item.ingredient}</td>
                                        <td
                                          style={{
                                            textAlign: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {item.quantity}
                                        </td>
                                        <td
                                          style={{
                                            textAlign: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {item.calorie}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </table>
                                <br />
                                <br />
                                <h5>Instructions:</h5>

                                <div className="form-group">
                                  <textarea
                                    rows="20"
                                    cols="20"
                                    wrap="hard"
                                    type="textarea"
                                    name="recdescription"
                                    className="form-control"
                                    placeholder="Enter Your Description"
                                    ref={(recdescription) => {
                                      this.recdescription = recdescription;
                                    }}
                                  />
                                </div>
                              </p>
                              <div
                                className="row"
                                style={{ marginBottom: "10vh" }}
                              >
                                <div
                                  className="col-6"
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={() =>
                                      this.editRecipePost(r._id, r.title)
                                    }
                                  >
                                    Update Description
                                  </button>
                                </div>

                                <div
                                  className="col-6"
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => this.deleteRecipe(r._id)}
                                  >
                                    Delete Post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
                {this.state.status === "Success" ? (
                  <div className="alert alert-success " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : this.state.status === "Failure" ? (
                  <div className="alert alert-danger " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : null}
              </div>

              <div hidden={this.state.workoutState !== true ? true : false}>
                {this.state.openId !== 0 && this.state.workoutId !== 0
                  ? this.state.workoutMongoList.map((r) => {
                      if (r._id === this.state.openId) {
                        return (
                          <div
                            className="card"
                            style={{
                              width: "100%",
                              height: "60vh",
                              overflow: "auto",
                            }}
                          >
                            <img
                              className="card-img-top"
                              src={r.img}
                              alt="Card image cap"
                              style={{ height: "20vh", objectFit: "cover" }}
                            />
                            <div class="card-body">
                              <h5 class="card-title">
                                Workout Name: {r.title}
                              </h5>
                              <p class="card-text">
                                <h5>Description:</h5>

                                <div className="form-group">
                                  <textarea
                                    rows="20"
                                    cols="20"
                                    wrap="hard"
                                    type="textarea"
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter Your Address"
                                    ref={(description) => {
                                      this.description = description;
                                    }}
                                  />
                                </div>
                              </p>
                              <div
                                className="row"
                                style={{ marginBottom: "10vh" }}
                              >
                                <div
                                  className="col-6"
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      this.editPost(r._id, r.title)
                                    }
                                  >
                                    Update Description
                                  </button>
                                </div>
                                <div
                                  className="col-6"
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => this.deleteWorkout(r._id)}
                                  >
                                    Delete post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
                {this.state.status === "Success" ? (
                  <div className="alert alert-success " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : this.state.status === "Failure" ? (
                  <div className="alert alert-danger " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyUploads;
