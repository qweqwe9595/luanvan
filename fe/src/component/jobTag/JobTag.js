import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./jobTag.scss";

function JobTag(jobI) {
  const time = new Date(jobI.jobI?.createdAt);
  const timejob1 = time.getDay();
  const timejob2 = time.getMonth();
  const timejob3 = time.getFullYear();
  const user = localStorage.getItem("userID");
  return (
    <div className="job_tag">
      <img
        src={`http://localhost:5000/images/${jobI?.jobI?.img}`}
        className="cover"
      ></img>
      <Link to={`/jobContent/${jobI.jobI._id}`}>
        <div className="title">
          {jobI?.jobI?.jobName ? (
            <span>{jobI.jobI.jobName}</span>            
          ) : (
            "không có tên"
          )}
        </div>
        <div className="timejob">
          <p>Ngày đăng: {timejob1+"/"+timejob2+"/"+timejob3}</p>
        </div>
        </Link>
    </div>
  );
}
export default JobTag;
