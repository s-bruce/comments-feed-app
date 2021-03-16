function Comment(props) {
  const getDateString = () => {
    // Format comment date
    // If within the past week: 'Thursday at 4pm'
    // If longer ago: 'April 1st at 2pm'
    const commentDate = new Date(props.data.created);
    const nowDate = new Date();
    const msSinceCreation = nowDate.getTime() - commentDate.getTime();
    const daysSinceCreation = msSinceCreation / (1000 * 60 * 60 * 24);
    let day;
    if (daysSinceCreation < 7) {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      day = weekdays[commentDate.getDay()];
    } else {
      const getDateOrdinal = d => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      }
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const date = commentDate.getDate();
      day = `${months[commentDate.getMonth()]} ${date}${getDateOrdinal(date)}`;
    }
    let hours = commentDate.getHours();
    let ampm = hours < 12 ? "am" : "pm";
    if (hours === 0 || hours === 12) {
      hours = 12;
    } else {
      hours %= 12;
    }

    return `${day} at ${hours}${ampm}`
  }

  return (
    <div className="comment">
      <p className="message">{props.data.message}</p>
      <div className="name-wrapper">
        <div className="name">{props.data.name}</div>
        <div className="date">on {getDateString()}</div>
      </div>
    </div>
  )
}

export default Comment