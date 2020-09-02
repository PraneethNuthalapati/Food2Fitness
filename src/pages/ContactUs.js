/**
 * @author Punarva Vyas <pn605302@dal.ca>
 */

import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "./Footer_black";


class ContactUs extends Component {
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
                  <strong>Contact Us</strong>
                </h1>
                <ol style={{ textAlign: "left" }}>
                  <li>
                    <b>Praneeth Nuthalapati: </b>
                    pr455456@dal.ca
                  </li>
                  <li>
                    <b>Dhruv Dalwadi: </b>
                    dh844999@dal.ca
                  </li>
                  <li>
                    <b>Anisha Shah: </b>
                    an220066@dal.ca
                  </li>
                  <li>
                    <b>Tanu Gulia: </b>
                    tn300318@dal.ca
                  </li>
                  <li>
                    <b>Sai Pavan Akuralapu: </b>
                    sp536952@dal.ca
                  </li>
                  <li>
                    <b>Punarva Vyas: </b>
                    pn605302@dal.ca
                  </li>
                </ol>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactUs;
