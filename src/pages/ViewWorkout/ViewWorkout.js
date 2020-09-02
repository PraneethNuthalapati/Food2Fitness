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

class viewWorkout extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    workoutMongoList: [],
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
    let workoutId = query.get("workoutId");
    await axios({
      method: "post",
      url: `${url}/api/workout/id`,
      data: {
        id: workoutId,
      },
    })
      .then((res) => {
        const workoutResponse = res.data;
        // console.log(workoutResponse);
        this.setState({ workoutMongoList: workoutResponse });
      })
      .catch((err) => {
        // console.log(err);
      });
    await axios({
      method: "GET",
      url: `${url}/api/comments/${workoutId}`,
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
        const fetchedUsers = arraytemp.workoutlikedVideos;

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
    let workoutId = query.get("workoutId");
    let curTime = new Date().toLocaleString();
    let user = sessionStorage.getItem("loginUserName");
    axios
      .post(`${url}/api/comments/addComment`, {
        videoId: workoutId,
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
    let workoutId = query.get("workoutId");
    const liked = this.state.likedData;
    // console.log(liked)
    liked.push({
      videoId: workoutId,
    });

    axios
      .post(`${url}/api/user/addLikeWorkout`, {
        id: sessionStorage.getItem("id"),
        videoId: liked,
      })
      .then((res) => {
        // console.log("entered")
        sessionStorage.setItem("likeStatus", "true");
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
    let workoutId = query.get("workoutId");
    let newLiked = [];
    for (let key in liked) {
      const temp = { ...liked[key] };
      if (temp.videoId !== workoutId) {
        newLiked.push({
          videoId: temp.videoId,
        });
      }
    }
    // console.log(newLiked);
    axios
      .post(`${url}/api/user/addLikeWorkout`, {
        id: sessionStorage.getItem("id"),
        videoId: newLiked,
      })
      .then((res) => {
        // console.log("entered");
        sessionStorage.setItem("likeStatus", "false");
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
          {this.state.workoutMongoList.map((r) => (
            <ReactPlayer
              url={r.url}
              className="mx-auto mb-3"
              width="60vw"
              height="50vh"
            />
          ))}
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8 mx-auto mb-3">
          {this.state.workoutMongoList.map((r) => (
            <div className="card" style={{ width: "100%" }}>
              <div className="card-header">Recipe Description</div>
              <div className="card-body">
                <div className="card-text">{r.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8 mx-auto mb-3">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3>Comment</h3>
              <div style={{ float: "right" }}>
                {sessionStorage.getItem("likeStatus") === "true" ? (
                  <button
                    class="w3-button w3-white w3-border"
                    onClick={this.unlikeHandler}
                  >
                    <b>
                      <i class="fa fa-thumbs-down"></i> Unlike
                    </b>
                  </button>
                ) : (
                  <button
                    class="w3-button w3-white w3-border"
                    disabled={this.state.buttonStatus}
                    onClick={this.likeHandler}
                  >
                    <b>
                      <i class="fa fa-thumbs-up"></i> Like
                    </b>
                  </button>
                )}
              </div>
            </div>
            <div class="panel-body">
              {sessionStorage.getItem("isLoggedIn") === "false" ? (
                <div>
                  <Link to="/login">
                    {/* {sessionStorage.setItem("comments", "{}")} */}
                    <button type="submit" class="btn btn-primary">
                      Add Comment
                    </button>
                  </Link>
                  <Link to="/workouts">
                    {/* <button type="submit" class="btn btn-primary" style={{padding:"7px 20px",fontSize:"22px", marginLeft:"40px"}}>Vew More</button> */}
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{ marginLeft: "40px" }}
                    >
                      View More
                    </button>
                  </Link>
                </div>
              ) : (
                <form>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      placeholder="write a comment..."
                      rows="3"
                      onChange={this.onCommentChange}
                    ></textarea>
                  </div>

                  {/* <button type="submit" class="btn btn-primary" style={{padding:"7px 20px",fontSize:"22px"}}>Post</button> */}

                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.postCommentHandler}
                  >
                    Post
                  </button>
                  <Link to="/workouts">
                    {/* <button type="submit" class="btn btn-primary" style={{padding:"7px 20px",fontSize:"22px", marginLeft:"40px"}}>Vew More</button> */}
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{ marginLeft: "40px" }}
                    >
                      View More
                    </button>
                  </Link>
                </form>
              )}
              <hr />
              <ul class="media-list">{listed}</ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default viewWorkout;
