/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class Registration extends Component {
  /* 
  In General:
  Status variable is used to set whether the action was successfull or not
  So for instance if failure, then it would show red colored alert box, 
  else if its success, then it would show green colored alert box 
  With that it would also show a message inside the alert box (which is using errorMessage variable)
  */

  //for user registration
  registration = async () => {
    //getting all the values from textbox
    let { value: fullname } = this.fullname;
    let { value: email } = this.email;
    let { value: password } = this.password;
    let { value: confirmpassword } = this.confirmpassword;
    //checking whether fullname, email, password and confirmpassword are empty
    if (
      fullname === "" &&
      email === "" &&
      password === "" &&
      confirmpassword === ""
    ) {
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
    //checking whether password is empty
    else if (password === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter The Password",
      });
    }
    //checking whether confirmpassword is empty
    else if (confirmpassword === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Confirm The Password",
      });
    }
    //checking whether confirmpassword matches password
    else if (password !== confirmpassword) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Confirm Password Doesn't Match With Password",
      });
    }
    //checking whether it follows email regex
    else if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({ status: "Failure" });
      this.setState({ errorMessage: "Please Enter Proper Email Address" });
    }
    //if all phases are cleared, then it would register
    else {
      let temp = [];
      //getting user profile using email. To check whether there is any existing user using the same email id or not
      await axios({
        method: "get",
        url: `${url}/api/user/email`,
        headers: {
          email: email,
        },
      })
        .then((res) => {
          //storing user data inside temp variable
          temp = res.data;
        })
        .catch((err) => {
          // console.log(err);
        });
      // if temp.length is zero means no user exists
      if (temp.length === 0) {
        //user registration
        await axios({
          method: "post",
          url: `${url}/api/user/add`,
          data: {
            fullname: fullname,
            email: email,
            password: password,
          },
        })
          .then(function (res) {
            // console.log(res);
          })
          .catch(function (err) {
            // console.log(err);
          });
        this.setState({ status: "Success" });
        this.setState({
          errorMessage: "Registration Successfull",
        });
        setTimeout(() => {
          this.setState({ registration: "true" });
        }, 1500);
      }
      //if temp.length is not zero, then user profile already exists
      else {
        this.setState({ status: "Failure" });
        this.setState({
          errorMessage: "Email Address Already Exists",
        });
      }
    }
  };
  state = {};
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "15vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "true" ? (
          <Redirect to="/" />
        ) : null}
        {this.state.registration === "true" ? <Redirect to="/login" /> : null}
        <Header />
        <div className="container">
          <form method="POST">
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
                  <strong>Register Here</strong>
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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    ref={(password) => {
                      this.password = password;
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Your Password"
                    ref={(confirmpassword) => {
                      this.confirmpassword = confirmpassword;
                    }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.registration}
                    style={{ paddingLeft: "60px", paddingRight: "60px" }}
                  >
                    Register
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

export default Registration;
