import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdStarOutline, MdStar } from "react-icons/md";

import "./jobTag.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";
function JobTag({ jobI, setJobId }) {
  const [user] = useContext(UserContext);
  const [join, setJoin] = useState(
    jobI.joins.some((item) => item === user?._id)
  );

  const joinJob = () => {
    axios
      .post(
        `http://localhost:5000/api/jobs/join `,
        {
          jobId: jobI._id,
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

  const xoaJob = () => {
    axios
      .delete(`http://localhost:5000/api/jobs/deleteOne`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          jobId: jobI._id,
        },
      })
      .then((res) => {
        alert("đã xóa thành công");
        setJobId((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notjoins = () => {
    axios
      .post(
        `http://localhost:5000/api/jobs/join `,
        {
          jobId: jobI._id,
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
    <div className="job_tag">
      <img
        src={`http://localhost:5000/images/${jobI?.img}`}
        className="cover"
      ></img>
      <div className="time">
        {jobI?.startTime ? (
          <span>Thời gian diễn ra sự kiện: <b>{new Date(jobI.startTime).toLocaleDateString('en-US')}</b></span>
        ) : (
          ""
        )}
      </div>
      <Link to={`/jobContent/${jobI?._id}`}>
        <div className="title">
          {jobI?.jobName ? <span>{jobI?.jobName}</span> : "jobName"}
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
                <MdStar className="icon_join" />
                <span>Đã tham gia</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                joinJob();
              }}
            >
              <div className="join">
                <MdStarOutline className="icon_join" />
                <span>Tham gia</span>
              </div>
            </button>
          )}
        </div>
        {user?.isAdmin ? (
          <button
            className="button_delete"
            onClick={() => {
              xoaJob(jobI._id);
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
export default JobTag;
