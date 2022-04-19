import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./jobTag.scss";
import dateFormat from "dateformat";

function JobTag(jobI) {
  const time = new Date(jobI.jobI?.createdAt);
  const user = localStorage.getItem("userID");
  return (
    <div className="job_tag">
      <img
        src={`http://localhost:5000/images/${jobI?.jobI?.img}`}
        className="cover"
        alt="asd"
      />
      <Link to={`/jobContent/${jobI.jobI._id}`}>
        <div className="title">
          {jobI?.jobI?.jobName ? (
            <span>{jobI.jobI.jobName}</span>
          ) : (
            "không có tên"
          )}
        </div>
        <div className="timejob">
          <p>Ngày đăng: {new Date(time).toLocaleDateString("en-US")}</p>
        </div>
      </Link>
    </div>
  );
}
export default JobTag;
