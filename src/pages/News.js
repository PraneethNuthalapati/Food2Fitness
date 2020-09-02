/**
 * @author Anisha Shah  <an220066@dal.ca>
 */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom_css/Home.css";
import Header from "../components/Header";
import Footer from "./Footer_black";
import axios from "axios";
import url from "../default";

class News extends Component {
  state = {
    page: 1,
    news: [],
    topnews: [],
    end: "start",
    content: "not empty",
  };

  //Fetching top-headlines
  trendingnews = async (country) => {
    this.news_country.value = country;

    //Use of axios to fetch top-headlines from newsapi
    await axios({
      method: "get",
      url: `${url}/api/news/trending`,
      headers: {
        country: country,
      },
    })
      .then((res) => {
        this.setState({ topnews: res.data });

        //To check whether the top-headlines are empty or not (which are stored inside topnews array)
        if (this.state.topnews.length === 0) {
          this.setState({ content: "empty" });
        } else {
          this.setState({ content: "not empty" });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //Fetching all news
  allnews = async (category, category_change) => {
    this.news_category.value = category;

    // To check whether category of news is changed or not
    if (category_change === true) {
      this.setState({ end: "start", page: (this.state.page = 1) });
    }

    //Use of axios to fetch all news from newsapi
    await axios({
      method: "get",
      url: `${url}/api/news/allnews`,
      headers: {
        category: category,
        page: this.state.page,
      },
    })
      .then((res) => {
        let arr = res.data;

        //If category is not changed then fetched news will append with previously fetched news otherwise fetched
        // news will overwrite the previously fetched news
        if (arr.length === 0) {
          this.setState({ end: "stop" });
        } else if (category_change === false) {
          this.setState(() => ({
            news: [...this.state.news, ...arr],
          }));
          this.setState({ page: this.state.page + 1 });
        } else {
          this.setState(() => ({
            news: arr,
          }));
          this.setState({ page: this.state.page + 1 });
          category_change = false;
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //Fetching top-headlines and all news when page is loaded
  componentDidMount = () => {
    this.allnews(this.news_category.value, false);
    this.trendingnews(this.news_country.value);
  };

  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        <Header />

        {/* UI for displaying top-headlines */}
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <div style={{ textAlign: "center" }}>
            <h3>Top Headlines</h3>
          </div>
          <div className="input-group mb-3 col-sm-12 col-lg-6 col-md-8 mx-auto">
            <select
              class="form-control"
              ref={(news_country) => {
                this.news_country = news_country;
              }}
              onChange={(e) => {
                this.trendingnews(e.target.value);
              }}
            >
              <option value="ca">Canada</option>
              <option value="in">India</option>
              <option value="au">Australia</option>
              <option value="us">United States</option>
              <option value="gb">United Kingdom</option>
              <option value="nz">New Zealand</option>
              <option value="jp">Japan</option>
              <option value="ae">UAE</option>
            </select>
          </div>
          {this.state.content === "not empty" ? (
            <div>
              <div className="row">
                {this.state.topnews.map((r, index) => (
                  <div
                    className="col-sm-6 col-md-6 col-lg-6 float-left"
                    style={{ padding: "30px" }}
                  >
                    <div className="card" style={{ width: "100%" }}>
                      <div className="d-flex">
                        <div className="w-25">
                          <img
                            src={r.urlToImage}
                            className="img-custom"
                            alt="news image"
                          />
                        </div>
                        <div className="w-75">
                          <div className="card-body">
                            <h5 className="card-title">
                              <b>{r.title}</b>
                            </h5>
                            <div>
                              <a href={r.url} target="_blank">
                                <button className="btn-sm btn-primary">
                                  Read More
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h5>No Result Found</h5>
            </div>
          )}
        </div>

        {/* UI for displaying all news */}
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <div style={{ textAlign: "center" }}>
            <h3>All News</h3>
          </div>
          <div className="input-group mb-3 col-sm-12 col-lg-6 col-md-8 mx-auto">
            <select
              class="form-control"
              ref={(news_category) => {
                this.news_category = news_category;
              }}
              onChange={(e) => {
                this.allnews(e.target.value, true);
              }}
            >
              <option value="health">Health</option>
              <option value="workout">Workout</option>
              <option value="fitness">Fitness</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div>
            <div className="row">
              {this.state.news.map((r, index) => (
                <div
                  className="col-sm-6 col-md-6 col-lg-6 float-left"
                  style={{ padding: "30px" }}
                >
                  <div className="card" style={{ width: "100%" }}>
                    <div className="d-flex">
                      <div className="w-25">
                        <img
                          src={r.urlToImage}
                          className="img-custom"
                          alt="news image"
                        />
                      </div>
                      <div className="w-75">
                        <div className="card-body">
                          <h5 className="card-title">
                            <b>{r.title}</b>
                          </h5>
                          <div>
                            <a href={r.url} target="_blank">
                              <button className="btn-sm btn-primary">
                                Read More
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {this.state.end === "start" ? (
              <div
                className="row"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <button
                  className="btn-sm btn-primary"
                  onClick={(e) => {
                    this.allnews(this.news_category.value, false);
                  }}
                >
                  View More
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default News;
