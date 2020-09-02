import React, { Component } from "react";
class Footer extends Component {
  state = {};
  render() {
    return (
      <footer
        className="footer fixed-bottom"
        style={{ backgroundColor: "#debe1f" }}
      >
        <div className="container text-center">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
