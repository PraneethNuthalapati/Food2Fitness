/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati <pr455456@dal.ca>
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom_css/Home.css";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class AddWorkout extends Component {
  state = {
    selectedFile: null,
  };

  saveWorkoutDetails = async (event) => {
    // console.log("Inside save Workout method");
    let { value: txtworkoutname } = this.txtworkoutname;
    let { value: txtdescription } = this.txtdescription;
    let { value: workoutvideo } = this.workoutvideo;
    let filename = this.filename.files[0];
    // console.log(filename);
    let temp = 0;

    if (
      txtworkoutname === "" &&
      txtdescription === "" &&
      workoutvideo === "" &&
      filename === undefined
    ) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please all the required details",
      });
    } else if (txtworkoutname === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please enter workout name",
      });
    } else if (workoutvideo === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please enter workout video url",
      });
    } else if (txtdescription === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please enter workout description",
      });
    } else if (filename === undefined) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please upload workout image",
      });
    } else {
      await axios({
        method: "post",
        url: `${url}/api/workout/addWorkout`,
        data: {
          title: txtworkoutname,
          description: txtdescription,
          cardDescription: txtdescription.substring(0, 97) + "...",
          url: workoutvideo,
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
        this.setState({ errorMessage: "Workout Added Successfully" });
        setTimeout(() => {
          this.setState({ workoutstatus: "true" });
        }, 1500);
      }
    }
  };

  fileSelectedHandler = (event) => {
    event.preventDefault();
    var imgA;
    let { value: txtworkoutname } = this.txtworkoutname;
    // console.log(event.target.files[0]);

    let file = event.target.files[0];
    // console.log(file);
    let filename = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      imgA = reader.result;
      axios
        .post(`${url}/api/workout/addWorkoutImage`, {
          title: txtworkoutname,
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

  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "false" ? (
          <Redirect to="/login" />
        ) : null}
        {this.state.workoutstatus === "true" ? (
          <Redirect to="/workouts" />
        ) : null}
        <Header />
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <div
            className="row"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <h3>Add Workout</h3>
          </div>
          <div className="row">
            <div
              className="col-sm-6 col-md-6 col-lg-6 mx-auto"
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
              <form className="needs-validation">
                <h3>Workout Name:</h3>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    id="txtworkoutname"
                    placeholder="Workout Name"
                    required
                    ref={(txtworkoutname) => {
                      this.txtworkoutname = txtworkoutname;
                    }}
                  />
                </div>
                <h3>Workout Video Url:</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="recipevideo"
                    required
                    placeholder="Enter your workout video url"
                    ref={(workoutvideo) => {
                      this.workoutvideo = workoutvideo;
                    }}
                  />
                </div>
                <h3>Workout Description:</h3>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    id="txtdescription"
                    placeholder="Description"
                    required
                    ref={(txtdescription) => {
                      this.txtdescription = txtdescription;
                    }}
                  />
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
                <br />
                <div
                  className="form-group row"
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  <div className="col-6">
                    <button type="button" class="btn btn-primary">
                      Clear All
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.saveWorkoutDetails}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddWorkout;
