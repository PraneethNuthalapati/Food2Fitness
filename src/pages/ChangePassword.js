/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";
import md5 from "md5";

class ChangePassword extends Component {
  /* 
  In General:
  Status variable is used to set whether the action was successfull or not
  So for instance if failure, then it would show red colored alert box, 
  else if its success, then it would show green colored alert box 
  With that it would also show a message inside the alert box (which is using errorMessage variable)
  */

  //performs change password
  changePassword = async () => {
    //getting all the values from the textboxes
    let { value: oldpassword } = this.oldpassword;
    let { value: newpassword } = this.newpassword;
    let { value: confirmpassword } = this.confirmpassword;
    //checking whether oldpassword, newpassword, and confirmpassword is empty
    if (oldpassword === "" && newpassword === "" && confirmpassword === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter All The Details",
      });
    }
    //checking whether oldpassword is empty
    else if (oldpassword === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter Your Old Password",
      });
    }
    //checking whether newpassword is empty
    else if (newpassword === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter Your New Password",
      });
    }
    //checking whether confirmpassword is empty
    else if (confirmpassword === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Confirm Your New Password",
      });
    }
    //checking whether confirmpassword matches newpassword
    else if (newpassword !== confirmpassword) {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Confirm Password Doesn't Match With Password",
      });
    }
    //if it passes through all phases, then it would perform change password
    else {
      //getting user id from session storage
      let id = sessionStorage.getItem("id");
      let temp = [];
      //getting user profile data using id
      await axios({
        method: "get",
        url: `${url}/api/user/id`,
        headers: {
          id: id,
        },
      })
        .then((res) => {
          //storing user data inside temp variable
          temp = res.data;
        })
        .catch((err) => {
          // console.log(err);
        });
      //matches the userprofiles password with old password, if true
      if (temp[0].password === md5(oldpassword)) {
        this.setState({ status: "Success" });
        this.setState({ errorMessage: "Password Reseted Successfully" });
        //resetting the password
        await axios({
          method: "post",
          url: `${url}/api/user/reset`,
          data: {
            id: id,
            password: newpassword,
          },
        })
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            // console.log(err);
          });
        setTimeout(() => {
          //changing login status to false
          sessionStorage.setItem("isLoggedIn", "false");
          //setting reset variable to true
          this.setState({ reset: "true" });
        }, 1500);
      }
      //if wrong, then entered oldpassword is wrong
      else {
        this.setState({ status: "Failure" });
        this.setState({
          errorMessage: "Enter Your Old Password Correctly",
        });
      }
    }
  };
  state = {};
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "17vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "false" ? (
          <Redirect to="/" />
        ) : null}
        {this.state.reset === "true" ? <Redirect to="/login" /> : null}
        <Header />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div
              className="row"
              style={{ textAlign: "center", marginBottom: "2vh" }}
            >
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
                  <strong>Change Password</strong>
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
                    type="password"
                    name="oldpassword"
                    className="form-control"
                    placeholder="Enter Your Old Password"
                    ref={(oldpassword) => {
                      this.oldpassword = oldpassword;
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="newpassword"
                    className="form-control"
                    placeholder="Enter Your New Password"
                    ref={(newpassword) => {
                      this.newpassword = newpassword;
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmpassword"
                    className="form-control"
                    placeholder="Confirm Your New Passowrd"
                    ref={(confirmpassword) => {
                      this.confirmpassword = confirmpassword;
                    }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.changePassword}
                    style={{ paddingLeft: "60px", paddingRight: "60px" }}
                  >
                    Submit
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

export default ChangePassword;
