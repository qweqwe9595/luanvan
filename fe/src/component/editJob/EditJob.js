import React, { useState, useEffect, useContext } from "react";
import "./EditJob.scss";
import { BsPenFill, BsImages, BsCloudArrowUpFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiMapPinFill } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import axios from "axios";
function EditJob({ setOpen, jobs }) {
  const [jobName, setJobName] = useState(jobs?.jobName);
  const [desc, setDesc] = useState(jobs?.desc);
  const [location, setLocation] = useState(jobs?.location);
  const [participants, setParticipants] = useState(jobs?.participants);
  const [link, setLink] = useState(jobs?.link);
  //const [user] = useContext(UserContext);
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);
  const updateJob = () => {
    var formData = new FormData();
    formData.append('jobId',jobs._id);
    formData.append('jobName',jobName);
    formData.append('desc',desc);
    formData.append('location',location);
    formData.append('participants',participants);
    formData.append('link',link);
    formData.append('jobImg', fileRef);
    formData.append('_method', 'PATCH');
    axios
      .patch(
        `http://localhost:5000/api/jobs/updateOne`,formData,
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
        className="show_edit_job"
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      <div className="edit_job">
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
          <div className="item_details">
            <input
              type="text"
              placeholder="Tiêu đề tuyển dụng"
              value={jobName}
              onChange={(e) => {
                setJobName(e.target.value);
              }}
            ></input>
            <BsPenFill></BsPenFill>
          </div>
          <div className="item_details">
            <input
              type="text"
              placeholder="Địa điểm làm việc"
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
              placeholder="link"
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
              placeholder="Nội dung tuyển dụng"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="button_create">
            <button
              onClick={() => {
                updateJob();
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

export default EditJob;
