import Comment from "./Comment";

function CommentList(props) {
  if (props.comments.length) {
    const commentElements = props.comments.map((comment, i) => {
      return <Comment data={comment} key={i.toString()} />
    })
  
    return (
      <div>{commentElements}</div>
    )
  } else {
    return (
      <h3>No comments</h3>
    )
  }
}

export default CommentList