import StatusCard from "../../../component/admin/StatusCard";
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
      <div className="container">
        <div className="event_contai">
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
              icon="CalendarAlt"
              title="Tất cả sự kiện"
              amount={eventDetails.length}
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
        <div className="event_manager_content mt-10">
          <div className="event_manager_content_header">
            <span className="px-2 py-1 bg-toan rounded-xl font-bold text-white">
              Danh sách các sự kiện
            </span>
          </div>
          <div className="grid grid-cols-2 p-4 justify-center lg:grid-cols-3 xl:grid-cols-4 gap-y-14">
            {eventDetails?.map((eventI, index) => {
              return (
                <div className="justify-self-center w-60 h-52" key={index}>
                  <img
                    src={`http://localhost:5000/images/${eventI?.img}`}
                    className="w-full h-40 object-cover"
                  ></img>
                  <div className="time">
                    {eventI?.startTime ? (
                      <span>
                        Thời gian diễn ra sự kiện:{" "}
                        <b>
                          {new Date(eventI.startTime).toLocaleDateString(
                            "en-US"
                          )}
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
