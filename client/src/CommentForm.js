import React from "react";

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      message: "",
      invalidInputs: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const property = target.name;
    this.setState({ [property]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // If either input is empty on submit, display error message
    if (!this.state.name || !this.state.message) {
      this.setState({ invalidInputs: true });
      return;
    }

    const commentData = {
      name: this.state.name,
      message: this.state.message
    }
    this.props.onCreate(commentData);

    // Reset state
    this.setState({
      name: "",
      message: "",
      invalidInputs: false
    })
  }

  render() {
    return (
      <div className="comment">
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="message"
            placeholder="Message"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add Comment</button>
        </form>
        {this.state.invalidInputs &&
          <div className="form-error">Please fill out all fields</div>
        }
      </div>
    )
  }
}

export default CommentForm