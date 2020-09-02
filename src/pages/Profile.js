/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class Profile extends Component {
  /* 
  In General:
  Status variable is used to set whether the action was successfull or not
  So for instance if failure, then it would show red colored alert box, 
  else if its success, then it would show green colored alert box 
  With that it would also show a message inside the alert box (which is using errorMessage variable)
  */

  //on load event
  componentDidMount = async () => {
    //will gather userid from the session storage
    let id = sessionStorage.getItem("id");
    let temp = [];
    //to get user details using id
    await axios({
      method: "get",
      url: `${url}/api/user/id`,
      headers: {
        id: id,
      },
    })
      .then((res) => {
        //storing the data inside the temp variable
        temp = res.data;
      })
      .catch((err) => {
        // console.log(err);
      });
    //Checking whether the id is valid or not
    if (temp[0]._id === id) {
      this.fullname.value = temp[0].fullname;
      this.email.value = temp[0].email;
    }
  };
  updateProfile = async () => {
    //will gather userid from the session storage
    let id = sessionStorage.getItem("id");
    //capture content stored inside the textbox
    let { value: fullname } = this.fullname;
    let { value: email } = this.email;
    //checking whether the textbox is empty
    if (fullname === "" && email === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter All The Details",
      });
    }
    //checking whether fullname is empty
    else if (fullname === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter Your Full Name",
      });
    }
    //checking whether email is empty
    else if (email === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter Your Email Address",
      });
    }
    //if all the conditions are satisfied then, it would update the profile
    else {
      this.setState({ status: "Success" });
      this.setState({
        errorMessage: "Profile Updated Successfully",
      });

      //update the user profile
      await axios({
        method: "post",
        url: `${url}/api/user/profile`,
        data: {
          id: id,
          fullname: fullname,
          email: email,
        },
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });

      setTimeout(() => {
        //would set update variable to true and would redirect to home page in 1.5seconds
        this.setState({ update: "true" });
      }, 1500);
    }
  };
  state = {};
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "20vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "false" ? (
          <Redirect to="/" />
        ) : null}
        {this.state.update === "true" ? <Redirect to="/" /> : null}
        <Header />
        <div className="container" style={{ marginBottom: "8vh" }}>
          <form onSubmit={this.handleSubmit}>
            <div className="row" style={{ textAlign: "center" }}>
              <div
                className="col-sm-6 col-md-6 col-lg-6 mx-auto"
                style={{
                  padding: "20px",
                  border: "1px solid black",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "1px 4px 6px grey",
                }}
              >
                <h1 className="text-primary">
                  <strong>Update Profile</strong>
                </h1>
                {this.state.status === "Success" ? (
                  <div className="alert alert-success " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : this.state.status === "Failure" ? (
                  <div className="alert alert-danger " role="alert">
                    {this.state.errorMessage}
                  </div>
                ) : null}
                <div className="form-group">
                  <input
                    type="text"
                    name="fullname"
                    className="form-control"
                    placeholder="Enter Your Full Name"
                    ref={(fullname) => {
                      this.fullname = fullname;
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Your Email Address"
                    ref={(email) => {
                      this.email = email;
                    }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.updateProfile}
                    style={{ paddingLeft: "60px", paddingRight: "60px" }}
                  >
                    Update
                  </button>
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

export default Profile;
