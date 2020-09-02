/**
 * @author Punarva Vyas <pn605302@dal.ca>
 */


import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";

class Support extends Component {
  
 state={};


submitQuery = async () => {
  this.setState({ status: "Success" });
  this.setState({ errorMessage: "Please check your mail" });

  //fetch user details from user_id
  let id = sessionStorage.getItem("id");
  let temp = [];
  // console.log(id);
  let { value: userQuery } = this.userQuery;
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
      // console.log(temp[0].email);
    })
    .catch((err) => {
      // console.log(err);
    });

    //sending the user query
    await axios({
      method: "post",
      url: `${url}/api/support/addquery`,
      data: {
        email: temp[0].email,
        userQuery: this.userQuery.value,
      },
    })
      .then((res) => {
  
        // console.log(temp[0].email);
        // console.log(this.userQuery.value);
      })
      .catch((err) => {
        // console.log(err);
      });

    //calling the sendmail api
    await axios({
      method: "post",
      url: `${url}/api/support/sendmail`,
      data: {
        email: temp[0].email,
        esubject: "Food2Fitness",
      },
    })
      .then((res) => {
        //storing the data inside the temp variable
        temp = res.data;
        // console.log(temp[0].email);
      })
      .catch((err) => {
        // console.log(err);
      });


}

  render() {
    return (
   <div style={{ marginBottom: "12vh", marginTop: "20vh" }}>
        <Header />
        <div className="container" style={{ marginBottom: "8vh" }}>
          <form onSubmit={this.handleSubmit}>
            <div className="row" style={{ justifyContent: "center" }}>
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
                <h1 className="text-primary" style={{ textAlign: "center" }}>
                  <strong>Support</strong>
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

                <p>
                  If you are having problem in using the website and the problem
                  is not mentioned inside FAQs, then please feel free to post
                  your problem inside the textbox given below. After submitting
                  the problem, our team will get back to you through email.
                </p>
                
                <div className="form-group">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Problem description..."
                    name="userQuery"
                    required
                    rows="7"
                    type="hidden"
                    ref={(userQuery) => {
                      this.userQuery = userQuery;
                    }}
                  ></textarea>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.submitQuery}
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

export default Support;
