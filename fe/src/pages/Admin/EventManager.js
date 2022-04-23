import StatusCard from "../../component/admin/StatusCard";
import "./EventManager.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChartLineEvent from "../../component/admin/ChartLineEvent";
function EventManager() {
  const [eventDetails, setEventDetails] = useState([]);

  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/newEvents?query=month",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data[`thang 4`]);
        setData(res.data);
      })
      .catch((err) => { });
  }, []);
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
        setEventDetails(res.data.eventsQuery.reverse());
      })
      .catch((err) => {});
  }, []);

  const xoaEvent = (eventI) => {
    axios
      .delete(`http://localhost:5000/api/events/deleteOne`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          eventId: eventI,
        },
      })
      .then((res) => {
        alert("đã xóa thành công");
        //setEventId((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="event_contai">
        <div className="button_create">
          <button>Tạo sự kiện mới</button>
        </div>
        
        <div className="tag">
          <StatusCard
            color="pink"
            icon="CalendarAlt"
            title="Tất cả sự kiện"
            amount={eventDetails.length}
          />
        </div>
        <div className="charline">
          <ChartLineEvent
            data={data}
          />
        </div>             
      </div>
      <div className="center_events">
        {eventDetails?.map((eventI, index) => {
          return (
            <div className="event_tags" key={index}>
              <img
                src={`http://localhost:5000/images/${eventI?.img}`}
                className="cover"
              ></img>
              <div className="time">
                {eventI?.startTime ? (
                  <span>
                    Thời gian diễn ra sự kiện:{" "}
                    <b>
                      {new Date(eventI.startTime).toLocaleDateString("en-US")}
                    </b>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <Link to={`/eventContent/${eventI?._id}`}>
                <div className="title">
                  {eventI?.eventName ? (
                    <span>{eventI?.eventName}</span>
                  ) : (
                    "eventName"
                  )}
                </div>
              </Link>
              <div className="button_delete">
                <button
                  onClick={() => {
                    xoaEvent(eventI._id);
                  }}
                >
                  Xóa sự kiện
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default EventManager;
