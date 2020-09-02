import React, { Component } from "react";
import recipe from "../images/recipe3.jpg";
import workout from "../images/workout2.jpg";
import "../custom_css/Home.css";
import Header from "../components/Header";
import AboutUs from "./AboutUs";
import Aboutf2f from "./AboutF2F.js";
import Subscribe from "./Subscribe";
import Footer from "./Footer_black";
class Home extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        <Header />
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" style={{ height: "50vh" }}>
                <img
                  className="d-block w-100 img-custom"
                  src={recipe}
                  alt="First slide"
                />
                <div
                  className="carousel-caption"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  <h5>Recipes</h5>
                  <p>Green Shakshuka With Cheese</p>
                </div>
              </div>
              <div className="carousel-item" style={{ height: "50vh" }}>
                <img
                  className="d-block w-100 img-custom"
                  src={workout}
                  alt="Second slide"
                />
                <div
                  className="carousel-caption"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  <h5>Workouts</h5>
                  <p>Surya Namaskar</p>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <AboutUs />
        <Aboutf2f />
        <Subscribe />
        {/* <Footer /> */}
        <Footer />
      </div>
    );
  }
}

export default Home;
