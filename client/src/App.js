import React from "react";
import './App.css';
import { Api } from "./api";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      fetchingComments: true,
      newComment: false
    };

    this.handleCreateComment = this.handleCreateComment.bind(this);
  }

  componentDidMount() {
    this.fetchComments();

    // Fetch comments from API every ten seconds to check for new comments
    setInterval(() => {
      this.fetchComments();
    }, 10000);
  }

  fetchComments() {
    Api.get("http://localhost:3001/getComments")
    .then(response => {
      // Sort by most recent comments
      response.sort((a, b) => {
        if (a.created > b.created) return -1;
        if (a.created < b.created) return 1;
        return 0;
      });

      const newState = { comments: response };

      if ((response.length > this.state.comments.length) && !this.state.fetchingComments) {
        // If we have more comments than previously, and we aren't fetching for the first time, display toast
        newState.newComment = true;
        setTimeout(() => {
          this.setState({ newComment: false });
        }, 5000);
      }

      if (this.state.fetchingComments) {
        newState.fetchingComments = false;
      }
      
      this.setState(newState);
    })
  }

  handleCreateComment(commentData) {
    Api.post("http://localhost:3001/createComment", commentData)
    .then(response => this.fetchComments())
  }

  render() {
    return (
      <div>
        {this.state.newComment &&
          <div className="new-comment-toast">New comment!</div>
        }
        <div className="content-container">
          <CommentForm onCreate={this.handleCreateComment} />
          {this.state.fetchingComments ? (
              <h3>Loading comments...</h3>
            ) : (
              <CommentList comments={this.state.comments} />
          )}
        </div>
      </div>
    )
  }
}

export default App;
