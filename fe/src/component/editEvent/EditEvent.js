import React, { useState, useEffect, useContext } from "react";
import "./EditEvent.scss";
import { BsPenFill, BsImages, BsCloudArrowUpFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiMapPinFill } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import axios from "axios";
function EditEvent({ setOpen, events }) {
  const [startTime, setStartTime] = useState( new Date(events?.startTime).toLocaleDateString("en-US"));
  const [eventName, setEventName] = useState(events?.eventName);
  const [desc, setDesc] = useState(events?.desc);
  const [location, setLocation] = useState(events?.location);
  const [participants, setParticipants] = useState(events?.participants);
  const [link, setLink] = useState(events?.link);
  const [duration, setDuration] = useState(events?.duration);
  //const [user] = useContext(UserContext);
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);
  const updateEvent = () => {
    var formData = new FormData();
    formData.append('eventId',events._id);
    formData.append('startTime',startTime);
    formData.append('eventName',eventName);
    formData.append('desc',desc);
    formData.append('location',location);
    formData.append('participants',participants);
    formData.append('link',link);
    formData.append('duration',duration);
    formData.append('eventImg', fileRef);
    formData.append('_method', 'PATCH');
    axios
      .patch(
        `http://localhost:5000/api/events/updateOne`,formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
      .then((res) => {
        console.log(res);
        alert("cập nhật thành công");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div
        className="show_edit_event"
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      <div className="edit_event">
        <div className="exit">
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </button>
        </div>

        <div className="pic_cover">
          {previewURL ? (
            <img className="cover" src={previewURL} alt=""></img>
          ) : (
            <BsImages></BsImages>
          )}
        </div>

        <div className="choose_img">
          <input
            id="file-upload"
            type="file"
            name="photo"
            onChange={function (e) {
              if (e.target.files[0]) {
                setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                setFileRef(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="create_details">
          <div className="time_event">
            <div className="starttime">
              <input
                type="text"
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
              giây
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
                updateEvent();
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEvent;
