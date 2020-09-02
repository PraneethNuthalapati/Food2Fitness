/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer_black";
import axios from "axios";
import url from "../default";

class ForgotPassword extends Component {
  /* 
  In General:
  Status variable is used to set whether the action was successfull or not
  So for instance if failure, then it would show red colored alert box, 
  else if its success, then it would show green colored alert box 
  With that it would also show a message inside the alert box (which is using errorMessageForgot variable)
  */

  state = {};

  //checking mail id exists or not, if yes, then it would send an email to the user for reset password
  checkEmail = async () => {
    //getting the value from the textbox
    let { value: email } = this.emailForgot;
    let temp = [];
    //getting the userprofile using email
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
    //checking whether email is empty
    if (email === "") {
      this.setState({ statusEmail: "Failure" });
      this.setState({ errorMessageForgot: "Please enter your email address" });
    }
    //checking whether email follows email regex
    else if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({ statusEmail: "Failure" });
      this.setState({
        errorMessageForgot: "Please enter proper email address",
      });
    }
    //if it passes through all phase, then it would send an email, if and only if the user exists
    else {
      //checking whether email exists or not
      if (temp[0].email === email) {
        //setting the statusEmail to success
        this.setState({ statusEmail: "Success" });
        this.setState({ errorMessageForgot: "Email sent successfully" });
        //would call email api end point and would send email id, subject and message
        await axios({
          method: "post",
          url: `${url}/api/user/send`,
          data: {
            email: email,
            esubject: "Food2Fitness: Forgot Password",
            emessage: `${url}/newpassword/${temp[0]._id}`,
          },
        })
          .then((res) => {})
          .catch((err) => {
            // console.log(err);
          });
      }
      //if no email id, then it would show an error message
      else {
        this.setState({ statusEmail: "Failure" });
        this.setState({ errorMessageForgot: "No User Exists" });
      }
    }
  };
  render() {
    return (
      <div
        style={{
          marginBottom: "12vh",
          marginTop: "20vh",
        }}
      >
        {sessionStorage.getItem("isLoggedIn") === "true" ? (
          <Redirect to="/" />
        ) : null}
        <Header />
        <div className="container-fluid" style={{ marginBottom: "6vh" }}>
          <div className="row" style={{ justifyContent: "center" }}>
            <div
              className="col-sm-6 col-md-6 col-lg-6"
              style={{
                padding: "20px",
                border: "1px solid black",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "1px 4px 6px grey",
              }}
            >
              <h1 className="text-primary" style={{ textAlign: "center" }}>
                <strong>Forgot Password</strong>
              </h1>
              <p>
                To reset your password, submit your email address below. If we
                can find you in the database, an email will be sent to your
                email address, with instructions how to get access again.
              </p>
              <form>
                {this.state.statusEmail === "Success" ? (
                  <div className="alert alert-success" role="alert">
                    {this.state.errorMessageForgot}
                  </div>
                ) : this.state.statusEmail === "Failure" ? (
                  <div className="alert alert-danger " role="alert">
                    {this.state.errorMessageForgot}
                  </div>
                ) : null}
                <div className="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="forgotEmail"
                    placeholder="Enter your email address"
                    ref={(emailForgot) => {
                      this.emailForgot = emailForgot;
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.checkEmail}
                    style={{ paddingLeft: "60px", paddingRight: "60px" }}
                  >
                    Submit
                  </button>
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

export default ForgotPassword;
