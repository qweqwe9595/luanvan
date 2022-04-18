import React, { useEffect, useState, useContext } from "react";
import "./jobContent.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import Nav from "../../component/nav/Nav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";
import EditJob from "../../component/editJob/EditJob";
function JobContent() {
  const param = useParams();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const user = localStorage.getItem("userID");
  const [numjoins, setNumjoins] = useState();
  const [join, setJoin] = useState();
  const socket = useContext(SocketContext);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/jobs/getOne/${param.id} `,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJobs(res.data.jobsQuery);
        setJoin(res.data.jobsQuery.joins.some((item) => item === user));
        setNumjoins(res.data.jobsQuery.joins.length);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/search?name=${searchTerm}`)
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((err) => {});
  }, [searchTerm]);

  const deleteJob = () => {
    axios
      .delete("http://localhost:5000/api/jobs/deleteOne", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        jobId: jobs._Id
      }
    })
      .then((res) => {
        alert("delete thanh cong");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    
    <div className="jobcontent">       
      <Nav></Nav>
      <div className="job_header">
        <img
          src={`http://localhost:5000/images/${jobs.img}`}
          className="cover"
        ></img>
        <div className="title">
          {jobs?.jobName ? <span>{jobs.jobName}</span> : ""}
        </div>
        <div className="button-options">
            <button className="job-button" onClick={()=>{setOpen(!open)}}>Chỉnh sửa</button>
            <Link to={"/job"}>
              <button className="job-button" onClick={()=>{deleteJob()}}>Xóa</button>
            </Link>
        </div>
      </div>
      {open ? (
        <EditJob
          setOpen={setOpen}
        jobs={jobs}></EditJob>
          ) :""}
      <div className="job_details">
        <div className="details_header">
          <span>Chi tiết tuyển dụng</span>
        </div>
        <div className="details">
          {jobs?.desc ? (
            <span><b>Nội dung:</b> {jobs.desc}</span>
          ) : (
            <span>không có nội dung</span>
          )}

          {jobs?.location ? <span><b>Địa điểm:</b> {jobs.location}</span> : ""}
          {jobs?.participants ? (
            <span>
              <b>Đối tượng tham gia:</b> {""}
              {jobs.participants}
            </span>
          ) : (
            ""
          )}
          {jobs?.link ? (
            <span>
              <b>Xem chi tiết tại:</b><a href={jobs?.link}>{jobs.link}</a>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>      
    </div>
  );
}
export default JobContent;
