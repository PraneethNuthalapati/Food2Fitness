import React, { Component } from "react";
import logo from "../images/logo1.png";
import "../custom_css/Home.css";
import { Link } from "react-router-dom";
class Header extends Component {
  state = {};
  logout = () => {
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("isLoggedIn", "false");
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-warning fixed-top">
        <a className="navbar-brand" style={{ alignItems: "center" }}>
          <table>
            <tr>
              <td>
                <img src={logo} className="App-logo" alt="food2fitnes_logo" />
              </td>
              <td style={{ bottom: "0px" }}>
                <h4 style={{ marginBottom: "0px" }}>FOOD2FITNESS</h4>
              </td>
            </tr>
          </table>
        </a>

        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#collapse_target"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="collapse_target">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="nav-link text-dark h5">
                  <strong>HOME</strong>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/recipes" style={{ textDecoration: "none" }}>
                <div className="nav-link text-dark h5">
                  <strong>RECIPES</strong>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <li className="nav-item dropdown">
                <div
                  class="nav-link dropdown-toggle text-dark h5"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <strong>WORKOUT</strong>
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/workouts" style={{ textDecoration: "none" }}>
                    <div className="dropdown-item text-dark h5">
                      <strong>Workout</strong>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/workouts" style={{ textDecoration: "none" }}>
                    <div className="dropdown-item text-dark h5">
                      <strong>BMI Calculator</strong>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/gymlocator" style={{ textDecoration: "none" }}>
                    <div className="dropdown-item text-dark h5">
                      <strong>GYM Locator</strong>
                    </div>
                  </Link>
                </div>
              </li>
            </li>
            {/* <li className="nav-item">
              <Link to="/blogs" style={{ textDecoration: "none" }}>
                <div className="nav-link text-dark h5">
                  <strong>BLOGS</strong>
                </div>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/news" style={{ textDecoration: "none" }}>
                <div className="nav-link text-dark h5">
                  <strong>NEWS</strong>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              {sessionStorage.getItem("isLoggedIn") === "true" ? (
                <Link to="/myuploads" style={{ textDecoration: "none" }}>
                  <div className="nav-link text-dark h5">
                    <strong>MY UPLOADS</strong>
                  </div>
                </Link>
              ) : null}
            </li>
            {sessionStorage.getItem("isLoggedIn") === "false" ? (
              <li className="nav-item">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <div className="nav-link text-dark h5">
                    <strong>LOGIN</strong>
                  </div>
                </Link>
              </li>
            ) : (
              <Link to="/" style={{ textDecoration: "none" }}>
                <li class="nav-item dropdown dropdown-menu-right">
                  <div
                    class="nav-link dropdown-toggle text-dark h5 dropdown-menu-right"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ paddingRight: "50px" }}
                  >
                    <strong>PROFILE</strong>
                  </div>
                  <div class="dropdown-menu">
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <div className="dropdown-item text-dark h5">
                        <strong>Update Profile</strong>
                      </div>
                    </Link>
                    <div class="dropdown-divider"></div>
                    <Link
                      to="/changepassword"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="dropdown-item text-dark h5">
                        <strong>Change Password</strong>
                      </div>
                    </Link>
                    <div class="dropdown-divider"></div>
                    <Link to="/support" style={{ textDecoration: "none" }}>
                      <div className="dropdown-item text-dark h5">
                        <strong>Support</strong>
                      </div>
                    </Link>
                    <div class="dropdown-divider"></div>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div
                        className="dropdown-item text-dark h5"
                        onClick={this.logout}
                      >
                        <strong>Logout</strong>
                      </div>
                    </Link>
                  </div>
                </li>
              </Link>
            )}
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="nav-link text-dark h5">
                  <span> </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
