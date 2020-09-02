/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class NewPassword extends Component {
  /* 
  In General:
  Status variable is used to set whether the action was successfull or not
  So for instance if failure, then it would show red colored alert box, 
  else if its success, then it would show green colored alert box 
  With that it would also show a message inside the alert box (which is using errorMessage variable)
  */

  //checking if the user is valid or not
  componentDidMount = async () => {
    let id = this.props.match.params.id;
    await axios({
      method: "get",
      url: `${url}/api/user/id`,
      headers: {
        id: id,
      },
    })
      .then((res) => {
        //setting the temp value
        this.setState({ temp: res.data });
      })
      .catch((err) => {
        this.setState({ userid: "true" });
      });
  };
  //this will reset the password
  resetPassword = async () => {
    //getting the values from the textbox
    let { value: password } = this.password;
    let { value: confirmpassword } = this.confirmpassword;
    //checking whether the password and confirmpassword is empty
    if (password === "" && confirmpassword === "") {
      this.setState({ status: "Failure" });
      this.setState({
        errorMessage: "Please Enter All The Details",
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
    //if it passes through all phases, then it would reset password
    else {
      //would check whether userid matches with the given userid(from url)
      //if yes, then it would change password
      if (this.state.temp[0]._id === this.props.match.params.id) {
        this.setState({ status: "Success" });
        this.setState({ errorMessage: "Password Reseted Successfully" });
        //changing the password
        await axios({
          method: "post",
          url: `${url}/api/user/reset`,
          data: {
            id: this.state.temp[0]._id,
            password: password,
          },
        })
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            // console.log(err);
          });

        setTimeout(() => {
          //set the 'reset' variable to true
          this.setState({ reset: "true" });
        }, 1500);
      }
    }
  };
  state = {};
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "21vh" }}>
        {sessionStorage.getItem("isLoggedIn") === "true" ? (
          <Redirect to="/notfound" />
        ) : null}
        {this.state.userid === "true" ? <Redirect to="/notfound" /> : null}
        {this.state.reset === "true" ? <Redirect to="/login" /> : null}
        <Header />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div
              className="row"
              style={{ textAlign: "center", marginBottom: "7vh" }}
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
                  <strong>New Password</strong>
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
                    name="newpassword"
                    className="form-control"
                    placeholder="Enter Your New Password"
                    ref={(password) => {
                      this.password = password;
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
                    onClick={this.resetPassword}
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

export default NewPassword;
