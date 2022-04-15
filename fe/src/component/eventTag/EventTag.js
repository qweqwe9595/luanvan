import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import "./EventTag.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";
function EventTag({ eventI, setEventId }) {
  const [user] = useContext(UserContext);
  const [join, setJoin] = useState(
    eventI.joins.some((item) => item === user?._Id)
  );
  const joinEvent = () => {
    axios
      .post(
        `http://localhost:5000/api/events/join `,
        {
          eventId: eventI._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJoin(true);
      })
      .catch((err) => {});
  };

  const xoaEvent = () => {
    axios
      .delete(`http://localhost:5000/api/events/deleteOne`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          eventId: eventI._id,
        },
      })
      .then((res) => {
        alert("đã xóa thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notjoins = () => {
    axios
      .post(
        `http://localhost:5000/api/events/join `,
        {
          eventId: eventI.eventI._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJoin(false);
      })
      .catch((err) => {});
  };
  return (
    <div className="event_tag">
      <img
        src={`http://localhost:5000/images/${eventI?.img}`}
        className="cover"
      ></img>
      <div className="time">
        {eventI?.startTime ? <span>{eventI.startTime}</span> : ""}
      </div>
      <Link to={`/eventContent/${eventI._id}`}>
        <div className="title">
          {eventI?.eventName ? <span>{eventI.eventName}</span> : "không có tên"}
        </div>
      </Link>
      <div className="button">
        <div className="button_join">
          {join ? (
            <button
              onClick={() => {
                notjoins();
              }}
            >
              <div className="join">
                <AiTwotoneStar className="icon_join" />
                <span>Đã tham gia</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                joinEvent();
              }}
            >
              <div className="join">
                <AiOutlineStar className="icon_join" />
                <span>Tham gia</span>
              </div>
            </button>
          )}
        </div>
        {user?.isAdmin ? (
          <button
            className="button_delete"
            onClick={() => {
              xoaEvent(eventI._id);
            }}
          >
            Xóa sự kiện
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default EventTag;
