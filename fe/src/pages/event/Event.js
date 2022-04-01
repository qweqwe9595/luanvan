import React, { useState, useEffect, useContext } from "react";
import "./Event.scss";
import Nav from "../../component/nav/Nav";
import axios from "axios";
import EventTag from "../../component/eventTag/EventTag";
import { UserContext } from "../../context/userContext";
import { BsPenFill, BsImages } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiMapPinFill } from "react-icons/ri";
function Event() {
  const [open, setOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [user] = useContext(UserContext);
  const [startTime, setStartTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [link, setLink] = useState("");
  const [duration, setDuration] = useState("");

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
  const createEvent = () => {
    axios.post(
      `http://localhost:5000/api/events/createOne`,
      {
        userId: user._id,
        startTime,
        eventName,
        desc,
        location,
        participants,
        link,
        duration,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      alert("thành công ");
      })
      .catch((err) => {});
  };
  return (
    <div className="event_container">
      <Nav></Nav>
      <div className="left_event">
<<<<<<< HEAD
        {user?.isAdmin && (
          <div
            className="item"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span>tạo sự kiện mới</span>
          </div>
        )}
        <div className="item">
          <span>sự kiện sắp diễn ra</span>
        </div>
=======
        <span>SỰ KIỆN SẮP DIỄN RA</span>
        {user?.isAdmin && <p>tao su kien</p>}
        <hr></hr>
>>>>>>> bebbd7d4ba1405acaca3c68a5ecec6d9c0913b4f
      </div>
      <div className="center_event">
        {eventDetails?.map((eventI, index) => (
          <EventTag eventI={eventI} key={index}></EventTag>
        ))}
      </div>
      {open ? (
        <div className="create_event">
        <div className="exit">
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            X
          </button>
        </div>

        <div className="pic_cover">
          <BsImages></BsImages>
        </div>
          
        <div className="choose_img">
          <button>
            chọn ảnh
          </button>
        </div> 
          
        <div className="create_details">
          <div className="time_event">
            <div className="starttime">
              <input
                type="date"
                placeholder="Thời gian bất đầu"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              ></input>
              <BiTimeFive></BiTimeFive>
            </div>

            <div className="day_number">
              <input
                type="number"
                min="0"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                placeholder="Khoảng thời gian diễn ra sự kiện"
              ></input>
              Ngày
            </div>
          </div>
          <div className="item_details">
            <input
              type="text"
              placeholder="Tiêu đề của sự kiện"
              value={eventName}
              onChange={(e) => {
                setEventName(e.target.value);
              }}
            ></input>
            <BsPenFill></BsPenFill>
          </div>
          <div className="item_details">
            <input
              type="text"
              placeholder="Đia điểm diễn ra sự kiện"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
            <RiMapPinFill></RiMapPinFill>
          </div>
          <div className="item_details">
            <input
              type="text"
              placeholder="Đối tượng tham gia"
              value={participants}
              onChange={(e) => {
                setParticipants(e.target.value);
              }}
            ></input>
            <BsPenFill></BsPenFill>
          </div>
          <div className="item_details">
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            ></input>
            <BsPenFill></BsPenFill>
          </div>
          <div className="item_contents">
            <textarea
              type="text"
              placeholder="Nội dung sự kiện"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="button_create">
            <button
              onClick={() => {
                createEvent();
              }}
            >
              Tạo sự kiện
            </button>
          </div>
        </div>
      </div>
      ):""}
      
    </div>
  );
}
export default Event;
