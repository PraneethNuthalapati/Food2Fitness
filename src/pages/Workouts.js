/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 * @author Anisha Shah <an220066@dal.ca>
 * @author Praneeth Nuthalapati  <pr455456@dal.ca>
 * @author Tanu Gulia  <tn300318@dal.ca>
 */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom_css/Home.css";
import Fab from "@material-ui/core/Fab";
import workout1 from "../images/workout1.jpg";
import workout2 from "../images/workout2.jpg";
import workout3 from "../images/workout3.jpg";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class Workouts extends Component {
  state = {
    workoutMongoList: [],
    openId: 0,
    workoutList: [
      {
        id: 1,
        title: "Handstand",
        img: { workout1 },
        like: 24,
        color: "black",
      },
      {
        id: 2,
        title: "Surya Namaskar",
        img: { workout2 },
        like: 20,
        color: "black",
      },
      {
        id: 3,
        title: "Diamond Push Up",
        img: { workout3 },
        like: 35,
        color: "black",
      },
    ],
    counter: 4,
  };

  componentDidMount() {
    axios
      .get(`${url}/api/workout/getAllWorkouts?limit=${this.state.counter}`)
      .then((response) => {
        const workoutResponse = response.data;
        // console.log(workoutResponse);
        this.setState({ workoutMongoList: workoutResponse });
        // console.log(this.state.workoutMongoList);
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  getMoreWorkouts = () => {
    let currCounter = this.state.counter;
    currCounter = currCounter + 4;
    axios
      .get(`${url}/api/workout/getAllWorkouts?limit=${currCounter}`)
      .then((response) => {
        const workoutResponse = response.data;
        this.setState({
          workoutMongoList: workoutResponse,
          counter: currCounter,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  openWorkout = async (idPassed) => {
    this.setState({ openId: idPassed });
    await axios({
      method: "post",
      url: `${url}/api/workout/id`,
      data: {
        id: idPassed,
      },
    })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  calculateBmi = () => {
    let { value: h } = this.height;
    let { value: w } = this.weight;
    this.result.innerHTML = `Result: ${(w / (h / 100) ** 2).toFixed(
      2
    )} Kg/m<sup>2</sup>`;
  };
  clearBmi = () => {
    this.height.value = null;
    this.weight.value = null;
    this.result.innerHTML = "Result:";
  };

  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        <Header />
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <div
            className="row"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <h3>Workouts</h3>
          </div>
          <div className="row">
            {this.state.workoutMongoList.map((r) => (
              <div
                className="col-sm-6 col-md-6 col-lg-6 float-left"
                style={{ padding: "30px" }}
              >
                <div>
                  <div className="card" style={{ width: "100%" }}>
                    <div className="d-flex">
                      <div className="w-25">
                        <img
                          src={r.img}
                          className="img-custom"
                          alt="recipe_image"
                        />
                      </div>
                      <div className="w-75">
                        <div className="card-body">
                          <h5 className="card-title">{r.title}</h5>
                          <p className="card-text">
                            {r.cardDescription}
                          </p>
                          <div>
                            <Link to={`/viewWorkout?workoutId=${r._id}`}>
                              <button
                                className="btn-sm btn-primary"
                                onClick={() => this.openWorkout(r._id)}
                              >
                                Read More
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="row"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <button
              className="btn-sm btn-primary"
              onClick={this.getMoreWorkouts}
            >
              View More
            </button>
          </div>
        </div>
        <div
          className="container-fluid"
          style={{
            marginTop: "30px",
            paddingTop: "30px",
            paddingBottom: "30px",
            backgroundColor: "#ebebeb",
          }}
        >
          <div
            className="row"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <h3>BMI Calculator</h3>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div class="col-sm-8 col-md-8 col-lg-8 mx-auto">
                <div className="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      Height (cm)
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="height"
                    required
                    ref={(height) => {
                      this.height = height;
                    }}
                  />
                </div>
                <div className="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      Weight (Kg)
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="weight"
                    required
                    ref={(weight) => {
                      this.weight = weight;
                    }}
                  />
                </div>
                <div className="form-group">
                  <div className="row" style={{ marginTop: "5vh" }}>
                    <div
                      className="col-6"
                      style={{ textAlign: "center", justifyContent: "center" }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={this.clearBmi}
                      >
                        Clear All
                      </button>
                    </div>
                    <div
                      className="col-6"
                      style={{ textAlign: "center", justifyContent: "center" }}
                    >
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.calculateBmi}
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div class="col-sm-8 col-md-8 col-lg-8 mx-auto">
                <h4
                  ref={(result) => {
                    this.result = result;
                  }}
                >
                  Result:
                </h4>
                <h4>Note:</h4>
                <p>
                  <ul>
                    <li>
                      Below 18.5 Kg/m<sup>2</sup> - Underweight
                    </li>
                    <li>
                      18.5 Kg/m<sup>2</sup>-24.9 Kg/m<sup>2</sup> - Normal or
                      Healthy Weight
                    </li>
                    <li>
                      25.0 Kg/m<sup>2</sup>-29.9 Kg/m<sup>2</sup> - Overweight
                    </li>
                    <li>
                      30.0 Kg/m<sup>2</sup>and Above - Obese
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Fab
          color="secondary"
          aria-label="add"
          style={{
            position: "fixed",
            right: "30px",
            bottom: "80px",
            display: "flex",
          }}
        >
          <Link
            to="/addworkout"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "5vh",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            +
          </Link>
        </Fab>
        <Footer />
      </div>
    );
  }
}

export default Workouts;
