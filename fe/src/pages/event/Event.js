import React, { useState, useEffect } from "react";
import "./Event.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import Nav from "../../component/nav/Nav";
import { Link } from "react-router-dom";
import axios from "axios";
function Event() {
  const [join, setJoin] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
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
        <hr></hr>
      </div>
      <div className="center_event">
        {eventDetails?.map((eventItem, index) => {
          return (
            <div className="event_tag" key={index}>
              
              <img
                src={`http://localhost:5000/images/${
                    eventItem?.img
                  }`}
                className="cover"
              ></img>
              <div className="time">
                {eventItem?.startTime ? (
                  <span>{eventItem.startTime}</span>
                ):"không có"}  
              </div>
              <Link to={`/eventContent/${eventItem._id}`}>
                <div className="title">
                 {eventItem?._id ? (
                  <span>{eventItem._id}</span>
                ):"không có"}  
              </div>
            </Link>
              

              <div className="button_join">
                <button
                  onClick={() => {
                    setJoin(!join);
                  }}
                >
                  {!join ? (
                    <div className="join">
                      <AiOutlineStar className="icon_join" />
                      <span>Tham gia</span>
                    </div>
                  ) : (
                    <div className="join">
                      <AiTwotoneStar className="icon_join" />
                      <span>Đã tham gia</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
export default Event;
