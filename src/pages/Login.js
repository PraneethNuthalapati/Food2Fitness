/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom_css/Login.css";
import "../custom_css/Home.css";
import Header from "../components/Header";
import Footer from "./Footer_black";
import axios from "axios";
import md5 from "md5";
import url from "../default";

class Login extends Component {
  /* 
  In General:
  Status variable is used to set whether the action was successfull or not
  So for instance if failure, then it would show red colored alert box, 
  else if its success, then it would show green colored alert box 
  With that it would also show a message inside the alert box (which is using errorMessage variable)
  */

  state = {};

  //would check login details, whether the details are right or wrong and according to that it would do login procedure
  checkLoginDetails = async () => {
    //getting the value from the textbox
    let { value: email } = this.email;
    let { value: password } = this.password;
    let temp = [];
    //getting the user profile using email
    await axios({
      method: "get",
      url: `${url}/api/user/email`,
      headers: {
        email: email,
      },
    })
      .then((res) => {
        //storing user data inside temp variable
        // console.log(res.data);
        temp = res.data;
      })
      .catch((err) => {
        // console.log(err);
      });
    //checking whether the given information is right or wrong, if right, then login success
    //md5 is library that is used encrypt password
    if (temp.length !== 0) {
      if (temp[0].email === email && temp[0].password === md5(password)) {
        this.setState({ status: "Success" });
        this.setState({ errorMessage: "Login successfull" });
        setTimeout(() => {
          //setting up the session storage values
          sessionStorage.setItem("id", temp[0]._id);
          sessionStorage.setItem("loginUserName", temp[0].fullname);
          sessionStorage.setItem("isLoggedIn", "true");
          this.setState({ loggedIn: "true" });
        }, 1500);
      }
    }
    //if the login credentials are wrong or invalid or empty textbox
    else {
      //checking if the email and password are empty
      if (email === "" && password === "") {
        this.setState({ status: "Failure" });
        this.setState({
          errorMessage: "Please enter your email address and password",
        });
      }
      //checking if the email is empty
      else if (email === "") {
        this.setState({ status: "Failure" });
        this.setState({
          errorMessage: "Please enter your email address",
        });
      }
      //checking if the password is empty
      else if (password === "") {
        this.setState({ status: "Failure" });
        this.setState({
          errorMessage: "Please enter your password ",
        });
      }
      //checking whether the email follows email regex or not
      else if (
        !email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        this.setState({ status: "Failure" });
        this.setState({ errorMessage: "Please enter proper email address " });
      }
      //if everything is filled inside the textbox, but wrong credentials then it would show an error
      else {
        this.setState({ status: "Failure" });
        this.setState({
          errorMessage: "Wrong email address or password ",
        });
      }
    }
  };

  render() {
    return (
      <div
        style={{
          marginBottom: "12vh",
          marginTop: "15vh",
        }}
      >
        {sessionStorage.getItem("isLoggedIn") === "true" ? (
          <Redirect to="/" />
        ) : null}
        {this.state.loggedIn === "true" ? <Redirect to="/" /> : null}
        <Header />
        <div className="container-fluid">
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
                <strong>Login</strong>
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
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="loginEmail"
                    placeholder="Enter your email address"
                    ref={(email) => {
                      this.email = email;
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    placeholder="Enter your password"
                    ref={(password) => {
                      this.password = password;
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.checkLoginDetails}
                    style={{ paddingLeft: "60px", paddingRight: "60px" }}
                  >
                    Login
                  </button>
                </div>
              </form>
              <br />
              <div style={{ textAlign: "center" }}>
                <p>
                  <Link to="/forgotpassword">
                    <a href="#">Forgot Password?</a>
                  </Link>
                </p>
              </div>
              <br />
              <div style={{ textAlign: "center" }}>
                <p>
                  Don't have an account?
                  <Link to="/registration">
                    <a href="#">Register</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
