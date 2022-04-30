import StatusCard from "../../../component/admin/StatusCard";
import "./EventManager.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChartLineEvent from "../../../component/admin/ChartLineEvent";
import CreateNewEvent from "../../../component/createNewEvent/CreateNewEvent";
function EventManager() {
  const [eventDetails, setEventDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [del, setDel] = useState(false);
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
        setData(res.data);
      })
      .catch((err) => {});
  }, [open, del]);


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
  }, [open, data]);

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
        setData((prev) => !prev);
        setDel(!del);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="event_manager">
        <div className="event_manager_left">
          <div className="button_create">
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Tạo sự kiện mới
            </button>
          </div>
          <div className="grid grid-cols-1">
            <StatusCard
              color="pink"
              icon="event"
              title="Tất cả sự kiện"
              amount={eventDetails?.length}
              // percentage="3.48"
              // percentageIcon="arrow_upward"
              // percentageColor="green"
              // date="Since last month"
            />
          </div>
          {data ? (
            <div className="charline">
              <ChartLineEvent data={data} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="event_manager_content">
          <div className="event_manager_content_header">
            <span>Danh sách các sự kiện</span>
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
        
      </div>
      {open ? <CreateNewEvent setOpen={setOpen}></CreateNewEvent> : ""}
    </>
  );
}
export default EventManager;
