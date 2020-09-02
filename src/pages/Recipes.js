/**
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 * @author Praneeth Nuthalapati  <pr455456@dal.ca>
 * @author Tanu Gulia  <tn300318@dal.ca>
 */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../custom_css/Home.css";
import Fab from "@material-ui/core/Fab";
import recipe1 from "../images/recipe1.jpg";
import recipe2 from "../images/recipe2.jpg";
import recipe3 from "../images/recipe3.jpg";
import Header from "../components/Header";
//import Footer from "../components/Footer";
import Footer from "./Footer_black";
import url from "../default";
import axios from "axios";
// import RecipeFilterModal from './RecipeFilterModal';

class Recipes extends Component {
  state = {
    recipeMongoList: [],
    veg: false,
    nonveg: false,
    vegan: false,
    tempList: [],
    searchList: [],
    search: "",
    openId: 0,
    showFilter: false,
    closeFilter: false,
    counter: 4,
  };

  componentDidMount() {
    axios
      .get(`${url}/api/recipes/getAllRecipes?limit=${this.state.counter}`)
      .then((response) => {
        const recipeResponse = response.data;
        this.setState({ recipeMongoList: recipeResponse });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  getMoreRecipes = () => {
    let currCounter = this.state.counter;
    currCounter = currCounter + 4;
    axios
      .get(`${url}/api/recipes/getAllRecipes?limit=${currCounter}`)
      .then((response) => {
        const recipeResponse = response.data;
        this.setState({
          recipeMongoList: recipeResponse,
          counter: currCounter,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  searchRecipe = () => {
    let { value } = this.searchBar;
    // console.log("value" + value);
    this.setState({ search: value });

    let counter = 0;
    this.setState({ searchList: [] });
    if (!this.state.veg) {
      this.state.recipeMongoList
        .filter((veglist) => veglist.type == "veg")
        .map((r) => {
          // console.log("from veg" + r.type);
          let title1 = r.title.toLowerCase();
          let value1 = value.toLowerCase();
          let ingredientfound = false;
          r.ingredients.map((s) => {
            let ingredientconverted = s.ingredient.toLowerCase();
            if (
              ingredientconverted.match(value1, "gi") ||
              value1.match(ingredientconverted, "gi")
            ) {
              ingredientfound = true;
            }
          });

          if (title1.match(value1, "gi") || ingredientfound) {
            counter++;
            this.setState((item) => ({
              searchList: [...item.searchList, r],
            }));
          }
        });
    }
    if (!this.state.nonveg) {
      this.state.recipeMongoList
        .filter((nonveglist) => nonveglist.type == "non-veg")
        .map((r) => {
          // console.log("from non-veg" + r.type);
          let title1 = r.title.toLowerCase();
          let value1 = value.toLowerCase();
          let ingredientfound = false;
          r.ingredients.map((s) => {
            let ingredientconverted = s.ingredient.toLowerCase();
            if (
              ingredientconverted.match(value1, "gi") ||
              value1.match(ingredientconverted, "gi")
            ) {
              ingredientfound = true;
            }
          });

          // console.log("ingredients" + JSON.stringify(r.ingredients));
          // console.log("ingredietnfound" + ingredientfound);
          if (title1.match(value1, "gi") || ingredientfound) {
            counter++;
            this.setState((item) => ({
              searchList: [...item.searchList, r],
            }));
          }
        });
    }
    if (!this.state.vegan) {
      this.state.recipeMongoList
        .filter((veganlist) => veganlist.type == "vegan")
        .map((r) => {
          // console.log("from vegan" + r.type);
          let title1 = r.title.toLowerCase();
          let value1 = value.toLowerCase();
          let ingredientfound = false;
          r.ingredients.map((s) => {
            let ingredientconverted = s.ingredient.toLowerCase();
            if (
              ingredientconverted.match(value1, "gi") ||
              value1.match(ingredientconverted, "gi")
            ) {
              ingredientfound = true;
            }
          });

          if (title1.match(value1, "gi") || ingredientfound) {
            counter++;
            this.setState((item) => ({
              searchList: [...item.searchList, r],
            }));
          }
        });
    }

    if (counter === 0) {
      // console.log("inside counter 0");
      this.setState({ searchList: [] });
    }
    // console.log(counter);
  };

  clearSearch = () => {
    this.searchBar.value = "";
    this.setState({ search: "" });
    this.setState({ searchList: [] });
    this.setState({ veg: false });
    this.setState({ nonveg: false });
    this.setState({ vegan: false });
  };
  onFilterveg = (e) => {
    this.setState({
      veg: !this.state.veg,
    });
    // console.log("inside on filter of veg" + this.state.veg);
  };
  onFilternonveg = (e) => {
    this.setState({
      nonveg: !this.state.nonveg,
    });
    // console.log("inside on filter" + !this.state.nonveg);
  };
  onFiltervegan = (e) => {
    this.setState({
      vegan: !this.state.vegan,
    });
    // console.log("inside onFiltervegan" + !this.state.vegan);
  };
  openRecipe = async (idPassed) => {
    // console.log(idPassed);
    // this.state.recipeMongoList.map((r) => {
    //   if (r._id === id) {
    //     this.setState({ openId: id });
    //     console.log(this.state.openId)
    //   }
    // });
    this.setState({ openId: idPassed });
    await axios({
      method: "post",
      url: `${url}/api/recipes/id`,
      data: {
        id: idPassed,
      },
    })
      .then((res) => {
        // temp = res.data;
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  likeRecipe = (event, id) => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      if (event.target.style.color === "black") {
        let index = this.state.recipeList.findIndex((e) => e.id === id);
        let newArray = [...this.state.recipeList];
        newArray[index].color = "red";
        this.setState({ recipeList: newArray });
      } else {
        let index = this.state.recipeList.findIndex((e) => e.id === id);
        let newArray = [...this.state.recipeList];
        newArray[index].color = "black";
        this.setState({ recipeList: newArray });
      }
    } else {
      this.setState({ notlogged: "true" });
    }
  };

  filterHandler = () => {
    let { value } = this.searchBar;
    // console.log("value" + value);
    this.setState({ search: value });

    let counter = 0;
    this.setState({ searchList: [] });
    if (!this.state.veg) {
      this.state.recipeMongoList
        .filter((veglist) => veglist.type == "veg")
        .map((r) => {
          counter++;
          this.setState((item) => ({
            searchList: [...item.searchList, r],
          }));
          // console.log("veg" + this.state.searchList);
        });
    }
    if (!this.state.nonveg) {
      this.state.recipeMongoList
        .filter((nonveglist) => nonveglist.type == "non-veg")
        .map((r) => {
          counter++;

          this.setState((item) => ({
            searchList: [...item.searchList, r],
          }));
          // console.log("nonveg" + this.state.searchList);
        });
    }
    if (!this.state.vegan) {
      counter++;
      this.state.recipeMongoList
        .filter((veganlist) => veganlist.type == "vegan")
        .map((r) => {
          this.setState((item) => ({
            searchList: [...item.searchList, r],
          }));
          // console.log("vegan" + this.state.searchList);
        });
    }

    if (counter === 0) {
      // console.log("inside counter 0");
      this.setState({ searchList: [] });
    }
    // console.log(counter);

    //     console.log("entered");
    //   if (!this.state.veg) {
    //     this.state.recipeMongoList.filter(veglist => veglist.type == 'veg').map((r) => {
    //       this.setState((item) => ({
    //         searchList: [...item.searchList, r],
    //       }));
    //       console.log("veg"+JSON.stringify(this.state.searchList));
    //     });
    //   }
    // if (!this.state.nonveg) {
    //   this.state.recipeMongoList.filter(nonveglist => nonveglist.type == 'non-veg').map((r) => {
    //     this.setState((item) => ({
    //       searchList: [...item.searchList, r],
    //     }));
    //     console.log("non-veg"+JSON.stringify(this.state.searchList));

    //   }
    //   );
    // }
    // if (!this.state.vegan) {

    //   this.state.recipeMongoList.filter(veganlist => veganlist.type == 'vegan').map((r) => {

    //     this.setState((item) => ({
    //       searchList: [...item.searchList, r],
    //     }));
    //     console.log("vegan"+JSON.stringify(this.state.searchList));

    //   }
    //   );
    //}
  };
  render() {
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        {this.state.notlogged === "true" ? <Redirect to="/login" /> : null}
        <Header />
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Apply Filters
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="Vegeterian"
                    checked={!this.state.veg}
                    onChange={this.onFilterveg}
                    id="checkvegetarian"
                  />
                  <label class="lblvegetarian">Vegetarian</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={!this.state.nonveg}
                    onChange={this.onFilternonveg}
                    id="checknonvegetarian"
                  />
                  <label class="lblnonvegetarian">Non-Vegetarian</label>
                </div>

                <div class="form-check">
                  <label class="lblvegan">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={!this.state.vegan}
                      onChange={this.onFiltervegan}
                      id="checkvegan"
                    />
                    Vegan
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.filterHandler}
                  data-dismiss="modal"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={{ marginTop: "15vh" }}>
          <div style={{ textAlign: "center" }}>
            <h3>Recipes</h3>
          </div>
          <div className="input-group mb-3 col-sm-12 col-lg-6 col-md-8 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search recipe by title or ingredients"
              ref={(searchBar) => {
                this.searchBar = searchBar;
              }}
            />
            {/* <div className="btn-group">
            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">
              Filter
            </button>

            </div> */}
            <div className="btn-group">
              <a href="#searchrecipes">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-search"
                  onClick={this.searchRecipe}
                >
                  Search
                </button>
              </a>
              {/* <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdowndiet"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Diet
              </button>
              <div class="dropdown-menu">

                <a class="dropdown-item">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value='Vegeterian'
                      
                      checked={!this.state.veg}
                      onChange={this.onFilterveg}
                      id="checkvegetarian"
                    />
                    <label class="lblvegetarian">Vegetarian</label>
                  </div>
                </a>

                <a class="dropdown-item" href="#">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={!this.state.nonveg}
                      onChange={this.onFilternonveg}
                      id="checknonvegetarian"
                    />
                    <label class="lblnonvegetarian">Non-Vegetarian</label>
                  </div>
                </a>
                <a class="dropdown-item" href="#">
                  <div class="form-check">
                  <label class="lblvegan">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={!this.state.vegan}
                      
                      onChange={this.onFiltervegan}
                      id="checkvegan"
                    />
                    Vegan
                    </label>
                  </div>
                </a>
              </div> */}
              <button
                type="button"
                class="btn btn-secondary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Filter
              </button>
              <button
                className="btn btn-danger"
                type="button"
                id="button-clear"
                onClick={this.clearSearch}
              >
                Clear
              </button>
            </div>
          </div>

          <div
            id="allrecipes"
            hidden={
              !(
                this.state.veg ^ this.state.nonveg ||
                this.state.nonveg ^ this.state.vegan
              )
                ? false
                : true
            }
          >
            <div className="row">
              {this.state.recipeMongoList.map((r, index) => (
                <div
                  className="col-sm-6 col-md-6 col-lg-6"
                  style={{ padding: "30px" }}
                >
                  <div className="card" style={{ width: "100%" }}>
                    <div className="d-flex">
                      <div className="w-25">
                        <img
                          src={r.img}
                          className="img-custom"
                          alt="recipe_image"
                        />
                      </div>
                      <div className="w-75">
                        <div className="card-body">
                          <h5 className="card-title">{r.title}</h5>
                          <p className="card-text">
                            {r.cardDescription}
                          </p>
                          <div>
                            <Link to={`/viewrecipe?recipeId=${r._id}`}>
                              <button
                                className="btn-sm btn-primary"
                                onClick={() => this.openRecipe(r._id)}
                              >
                                Read More
                              </button>
                            </Link>
                            {/* <i
                              className="fa fa-heart"
                              style={{
                                float: "right",
                                color: r.color,
                              }}
                              onClick={(e) => this.likeRecipe(e, r.id)}
                            ></i> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="row"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <button
                className="btn-sm btn-primary"
                onClick={this.getMoreRecipes}
              >
                View More
              </button>
            </div>
          </div>

          <div
            id="searchrecipes"
            style={{ marginTop: "5vh" }}
            hidden={
              this.state.veg ^ this.state.nonveg ||
              this.state.nonveg ^ this.state.vegan ||
              this.state.search !== ""
                ? false
                : true
            }
          >
            <div style={{ textAlign: "center" }}>
              <h3>Search Result</h3>
            </div>
            <div className="row">
              {this.state.searchList.length > 0 ? (
                this.state.searchList.map((r, index) => (
                  <div
                    className="col-sm-6 col-md-6 col-lg-6"
                    style={{ padding: "30px" }}
                  >
                    
                    <div className="card" style={{ width: "100%" }}>
                      <div className="d-flex">
                        <div className="w-25">
                          <img
                            src={r.img}
                            className="img-custom"
                            alt="recipe_image"
                          />
                        </div>
                        <div className="w-75">
                          <div className="card-body">
                            <h5 className="card-title">{r.title}</h5>
                            <div>
                              <Link to={`/viewrecipe?recipeId=${r._id}`}>
                                <button
                                  className="btn-sm btn-primary"
                                  onClick={() => this.openRecipe(r._id)}
                                >
                                  Read More
                                </button>
                              </Link>
                              {/* <i
                              className="fa fa-heart"
                              style={{
                                float: "right",
                                color: r.color,
                              }}
                              onClick={(e) => this.likeRecipe(e, r.id)}
                            ></i> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-danger " role="alert">
                  No Result Found
                </div>
              )}
            </div>
          </div>
        </div>
        <Fab
          color="secondary"
          aria-label="add"
          style={{
            position: "fixed",
            right: "30px",
            bottom: "80px",
            display: "flex",
          }}
        >
          <Link
            to="/addrecipe"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "5vh",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            +
          </Link>
        </Fab>
        <Footer />
      </div>
    );
  }
}

export default Recipes;
