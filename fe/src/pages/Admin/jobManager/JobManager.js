import StatusCard from "../../../component/admin/StatusCard";
import "./JobManager.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChartLineJob from "../../../component/admin/ChartLineJob";
import CreateNewJob from "../../../component/createNewJob/CreateNewJob";
function JobManager() {
  const [jobDetails, setJobDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/newJobs?query=month",
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
        "http://localhost:5000/api/jobs/all",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJobDetails(res.data.jobsQuery.reverse());
      })
      .catch((err) => {});
  }, [open, data]);

  const xoaJob = (jobI) => {
    axios
      .delete(`http://localhost:5000/api/jobs/deleteOne`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          jobId: jobI,
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
      <div className="job_manager">
        <div className="job_manager_left">
          <div className="button_create">
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Tạo tuyển dụng mới
            </button>
          </div>
          <div className="grid grid-cols-1">
            <StatusCard
              color="pink"
              icon="works"
              title="Tất cả tuyển dụng"
              amount={jobDetails?.length}
              // percentage="3.48"
              // percentageIcon="arrow_upward"
              // percentageColor="green"
              // date="Since last month"
            />
          </div>
          {data ? (
            <div className="charline">
              <ChartLineJob data={data} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="job_manager_content">
          <div className="job_manager_content_header">
            <span>Danh sách các tuyển dụng</span>
          </div>
          <div className="center_jobs">
            {jobDetails?.map((jobI, index) => {
              return (
                <div className="job_tags" key={index}>
                  <img
                    src={`http://localhost:5000/images/${jobI?.img}`}
                    className="cover"
                  ></img>
                  <div className="time">
                    {jobI?.startTime ? (
                      <span>
                        Thời gian diễn ra tuyển dụng:{" "}
                        <b>
                          {new Date(jobI.startTime).toLocaleDateString("en-US")}
                        </b>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <Link to={`/jobContent/${jobI?._id}`}>
                    <div className="title">
                      {jobI?.jobName ? <span>{jobI?.jobName}</span> : "jobName"}
                    </div>
                  </Link>
                  <div className="button_delete">
                    <button
                      onClick={() => {
                        xoaJob(jobI._id);
                      }}
                    >
                      Xóa tuyển dụng
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {open ? <CreateNewJob setOpen={setOpen}></CreateNewJob> : ""}
    </>
  );
}
export default JobManager;
