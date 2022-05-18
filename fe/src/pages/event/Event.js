import React, { useState, useEffect, useContext } from "react";
import "./Event.scss";
import Nav from "../../component/nav/Nav";
import axios from "axios";
import EventTag from "../../component/eventTag/EventTag";
import { UserContext } from "../../context/userContext";
import CreateNewEvent from "../../component/createNewEvent/CreateNewEvent";
function Event() {
  const [open, setOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [user] = useContext(UserContext);
  const [eventId, setEventId] = useState(false);
  const [filter, setFilter] = useState("new");
  useEffect(async () => {
    console.log("alkjsd");
    switch (filter) {
      case "new": {
        return axios
          .get("http://localhost:5000/api/events/all", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res);
            setEventDetails(res.data.eventsQuery.reverse());
          })
          .catch((err) => {});
        break;
      }
      case "joined": {
        return axios
          .get("http://localhost:5000/api/events/getuser", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res);
            setEventDetails(res.data.eventsQuery.reverse());
          })
          .catch((err) => {});
        break;
      }
      default: {
        setEventDetails([]);
      }
    }
  }, [open, eventId, filter]);
  return (
    <div className="event_container">
      <Nav></Nav>
      <div className="left_event">
        {user?.isAdmin && (
          <div
            className="item"
            onClick={() => {
              setOpen(true);
            }}
          >
            <span>Tạo sự kiện mới</span>
          </div>
        )}
        <div
          className="item"
          onClick={() => {
            setFilter("new");
          }}
        >
          <span>Sự kiện sắp diễn ra</span>
        </div>
        <div
          className="item"
          onClick={() => {
            setFilter("joined");
          }}
        >
          <span>Đã tham gia</span>
        </div>
      </div>
      <div className="center_event">
        {eventDetails?.map((eventId, index) => {
          return (
            <EventTag
              eventI={eventId}
              setEventId={setEventId}
              key={index}
            ></EventTag>
          );
        })}
      </div>

      {open ? <CreateNewEvent setOpen={setOpen}></CreateNewEvent> : ""}
    </div>
  );
}
export default Event;
