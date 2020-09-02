/**
 * @author Tanu Gulia  <tn300318@dal.ca>
 * @author Praneeth Nuthalapati <pr455456@dal.ca>
 * @author Dhruv Dalwadi <dh844999@dal.ca>
 */

import React, { Component } from "react";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import Footer from "../Footer_black";
import { Link } from "react-router-dom";
import url from "../../default";
import axios from "axios";
import { withRouter } from "react-router-dom";

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    recipeMongoList: [],
    commentList: [],
    commentText: "",
    likedData: [],
    likedStatus: false,
    buttonStatus: true,
  };

  componentDidMount = async () => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      this.setState({ buttonStatus: false });
    }
    const query = new URLSearchParams(this.props.location.search);
    let recipeId = query.get("recipeId");
    // alert(recipeId);
    await axios({
      method: "post",
      url: `${url}/api/recipes/id`,
      data: {
        id: recipeId,
      },
    })
      .then((res) => {
        const recipeResponse = res.data;
        // console.log(recipeResponse);
        this.setState({ recipeMongoList: recipeResponse });
      })
      .catch((err) => {
        // console.log(err);
      });

    await axios({
      method: "GET",
      url: `${url}/api/comments/${recipeId}`,
    })
      .then((response) => {
        // console.log(response);
        const fetchedComments = [];
        for (let key in response.data) {
          fetchedComments.push({
            ...response.data[key],
          });
        }
        this.setState({ commentList: fetchedComments });
        // console.log(fetchedComments);
      })
      .catch((err) => {
        // console.log(err);
      });

    await axios({
      method: "GET",
      url: `${url}/api/user/${sessionStorage.getItem("id")}`,
    })
      .then((response) => {
        // console.log(response);
        const arraytemp = { ...response.data[0] };
        // console.log(arraytemp.recipelikedVideos);
        const fetchedUsers = arraytemp.recipelikedVideos;

        this.setState({ likedData: fetchedUsers });
        // console.log(this.state.likedData);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  onCommentChange = (e) => {
    this.setState({ commentText: e.target.value });
  };
  postCommentHandler = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(this.props.location.search);
    let recipeId = query.get("recipeId");
    let curTime = new Date().toLocaleString();
    let user = sessionStorage.getItem("loginUserName");
    axios
      .post(`${url}/api/comments/addComment`, {
        videoId: recipeId,
        userId: user,
        comment: this.state.commentText,
        commentDate: curTime,
      })
      .then((res) => {
        // console.log(res);
        // console.log("Comment Added Successfully")
        window.location.reload(false);
        // res.send("Job Added Successfully!!!")
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  likeHandler = () => {
    const query = new URLSearchParams(this.props.location.search);
    let recipeId = query.get("recipeId");
    const liked = this.state.likedData;
    // console.log(liked)
    liked.push({
      videoId: recipeId,
    });

    axios
      .post(`${url}/api/user/addLike`, {
        id: sessionStorage.getItem("id"),
        videoId: liked,
      })
      .then((res) => {
        // console.log("entered")
        sessionStorage.setItem("likeStatus1", "true");
        this.setState({
          likedStatus: true,
        });
        // window.location.reload(false)
        // res.send("Job Added Successfully!!!")
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  unlikeHandler = () => {
    const liked = this.state.likedData;
    const query = new URLSearchParams(this.props.location.search);
    let recipeId = query.get("recipeId");
    let newLiked = [];
    for (let key in liked) {
      const temp = { ...liked[key] };
      if (temp.videoId !== recipeId) {
        newLiked.push({
          videoId: temp.videoId,
        });
      }
    }
    // console.log(newLiked);
    axios
      .post(`${url}/api/user/addLike`, {
        id: sessionStorage.getItem("id"),
        videoId: newLiked,
      })
      .then((res) => {
        // console.log("entered");
        sessionStorage.setItem("likeStatus1", "false");
        this.setState({
          likedStatus: false,
        });
        // window.location.reload(false)
        // res.send("Job Added Successfully!!!")
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  render() {
    const listed = this.state.commentList
      .map((cKey) => {
        return (
          <li class="media">
            <div class="media-body">
              <span class="text-muted pull-right">
                <small class="text-muted">{cKey.commentDate}</small>
              </span>
              <strong class="text-success">@{cKey.userId}</strong>
              <p>{cKey.comment}</p>
            </div>
          </li>
        );
      })
      .reduce((arr, ele) => {
        return arr.concat(ele);
      }, []);
    return (
      <div style={{ marginBottom: "12vh", marginTop: "12vh" }}>
        <Header />
        <div
          className="col-sm-8 col-md-8 col-lg-8 mx-auto mb-3"
          style={{ marginTop: "15vh" }}
        >
          {this.state.recipeMongoList.map((r) => (
            <ReactPlayer
              url={r.url}
              className="mx-auto mb-3"
              width="60vw"
              height="50vh"
            />
          ))}
        </div>

        {this.state.recipeMongoList.map((r) => (
          <div
            className="col-sm-8 col-md-8 col-lg-8 mx-auto mb-3"
            style={{ marginTop: "10vh" }}
          >
            <h3>Nutrition Value</h3>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {r.ingredients.map((item) => {
                  return (
                    <tr>
                      <td>{item.ingredient}</td>
                      <td>{item.quantity}</td>
                      <td>{item.calorie}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

        <div className="col-sm-8 col-md-8 col-lg-8 mx-auto mb-3">
          {this.state.recipeMongoList.map((r) => (
            <div className="card" style={{ width: "100%" }}>
              <div className="card-header">Recipe Description</div>
              <div className="card-body">
                <div className="card-text">{r.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-sm-8 col-md-8 col-lg-8 mx-auto mb-3">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Comment</h3>
              <div style={{ float: "right" }}>
                {this.state.likedStatus ? (
                  <button
                    className="w3-button w3-white w3-border"
                    style={{ marginLeft: "40px" }}
                    onClick={this.unlikeHandler}
                  >
                    <b>
                      <i className="fa fa-thumbs-down"></i> Unlike
                    </b>
                  </button>
                ) : (
                  <button
                    className="w3-button w3-white w3-border"
                    disabled={this.state.buttonStatus}
                    style={{ marginLeft: "40px" }}
                    onClick={this.likeHandler}
                  >
                    <b>
                      <i className="fa fa-thumbs-up"></i> Like
                    </b>
                  </button>
                )}
              </div>
            </div>
            <div className="panel-body">
              {sessionStorage.getItem("isLoggedIn") === "false" ? (
                <div>
                  <Link to="/login">
                    {/* {sessionStorage.setItem("comments", "{}")} */}
                    <button type="submit" className="btn btn-primary">
                      Add Comment
                    </button>
                  </Link>
                  <Link to="/recipes">
                    {/* <button type="submit" class="btn btn-primary" style={{padding:"7px 20px",fontSize:"22px", marginLeft:"40px"}}>Vew More</button> */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginLeft: "40px" }}
                    >
                      View More
                    </button>
                  </Link>
                </div>
              ) : (
                <form>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="write a comment..."
                      rows="3"
                      onChange={this.onCommentChange}
                    ></textarea>
                  </div>

                  {/* <button type="submit" class="btn btn-primary" style={{padding:"7px 20px",fontSize:"22px"}}>Post</button> */}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.postCommentHandler}
                  >
                    Post
                  </button>
                  <Link to="/recipes">
                    {/* <button type="submit" class="btn btn-primary" style={{padding:"7px 20px",fontSize:"22px", marginLeft:"40px"}}>Vew More</button> */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginLeft: "40px" }}
                    >
                      View More
                    </button>
                  </Link>
                </form>
              )}
              <hr />
              <ul className="media-list">{listed}</ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(ViewRecipe);
