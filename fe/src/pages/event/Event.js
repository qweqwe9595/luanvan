import React, { useState, useEffect, useContext } from "react";
import "./Event.scss";
import Nav from "../../component/nav/Nav";
import axios from "axios";
import EventTag from "../../component/eventTag/EventTag";
import { UserContext } from "../../context/userContext";

function Event() {
  const [eventDetails, setEventDetails] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/events/all",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setEventDetails(res.data.eventsQuery);
      })
      .catch((err) => {});
  }, []);
  console.log(eventDetails);

  return (
    <div className="event_container">
      <Nav></Nav>
      <div className="left_event">
        <span>SỰ KIỆN SẮP DIỄN RA</span>
        {user.isAdmin && <p>tao su kien</p>}
        <hr></hr>
      </div>
      <div className="center_event">
        {eventDetails?.map((eventI, index) => (
          <EventTag eventI={eventI} key={index}></EventTag>
        ))}
      </div>
    </div>
  );
}
export default Event;
