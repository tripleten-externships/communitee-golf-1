import React from "react";

interface TimePassedProps {
  timestamp: number;
}

const TimePassed: React.FC<TimePassedProps> = ({ timestamp }) => {
  const timeNow = Date.now();
  const seconds = Math.floor((timeNow - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const isYesterday = () => {
    // to check if the timestamp was yesterday
    const dateTimestamp = new Date(timestamp);
    const dateNow = new Date(timeNow);

    // set both dates to midnight to compare the day
    dateTimestamp.setHours(0, 0, 0, 0);
    dateNow.setHours(0, 0, 0, 0);

    const diff = dateNow.getTime() - dateTimestamp.getTime();
    const oneDay = 1000 * 60 * 60 * 24;

    return diff === oneDay;
  };

  const formatDate = () => {
    // helper to format date
    const date = new Date(timestamp);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  };

  if (seconds < 60) {
    return <span>Just now</span>;
  } else if (minutes < 60) {
    return <span>{minutes}min</span>;
  } else if (isYesterday()) {
    return <span>Yesterday</span>;
  } else if (hours < 24) {
    return <span>{hours}h</span>;
  } else if (days < 7) {
    return <span>{days} days ago</span>;
  } else {
    return <span>{formatDate()}</span>;
  }
};

export default TimePassed;
