import React, { Component } from "react";
import gear from "../images/gear.png";
import "../custom_css/Home.css";
import "../custom_css/PageNotFound.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

class PageNotFound extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        <Header />
        <div
          className="container-fluid"
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "35vh",
          }}
        >
          <img
            src={gear}
            className="img-custom gear"
            style={{
              height: "20vh",
              width: "20vh",
            }}
          />
          <h3>Page Not Found</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PageNotFound;
