// set data to the local storage
const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// get data from the local storage
const getData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key)).reverse();
  } else {
    return [];
  }
};

// create alert
const createAlert = (type, message) => {
  return `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          <p class="m-0">${message}</p>
      </div>
      
      `;
};

//  time age
function timeAgo(timestamp) {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  // Define the time intervals in milliseconds
  const oneMinute = 60 * 1000;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;

  if (timeDifference < oneMinute) {
    return "Just now";
  } else if (timeDifference < oneHour) {
    const minutesAgo = Math.floor(timeDifference / oneMinute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < oneDay) {
    const hoursAgo = Math.floor(timeDifference / oneHour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < oneWeek) {
    const daysAgo = Math.floor(timeDifference / oneDay);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < oneMonth) {
    const weeksAgo = Math.floor(timeDifference / oneWeek);
    return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < oneYear) {
    const monthsAgo = Math.floor(timeDifference / oneMonth);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / oneYear);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
}
