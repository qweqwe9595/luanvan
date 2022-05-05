import StatusCard from "../../../component/admin/StatusCard";
import "./reportManager.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChartLineReport from "../../../component/admin/ChartLineReport";
function ReportManager() {
  const [reportDetails, setReportDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/newReports?query=month",
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
        "http://localhost:5000/api/reports/all",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setReportDetails(res.data.reportsQuery.reverse());
      })
      .catch((err) => {});
  }, [open, data]);

  const xoaReport = (reportI) => {
    axios
      .delete(`http://localhost:5000/api/reports/deleteOne`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          reportId: reportI,
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
      <div className="report_manager">
        <div className="report_manager_left">
          <div className="grid grid-cols-1">
            <StatusCard
              color="pink"
              icon="reports"
              title="Tất cả báo cáo"
              amount={reportDetails?.length}
            />
          </div>
          {data ? (
            <div className="charline">
              <ChartLineReport data={data} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="report_manager_content">
          <div className="report_manager_content_header">
            <span>Danh sách các báo cáo</span>
          </div>
          <div className="center_reports">
          {reportDetails?.map((reportI, index) => {
            return (
              <div className="report_tags" key={index}>
                <img
                  src={`http://localhost:5000/images/${reportI?.img}`}
                  className="cover"
                ></img>
                <div className="time">
                  {reportI?.startTime ? (
                    <span>
                      Thời gian diễn ra báo cáo:{" "}
                      <b>
                        {new Date(reportI.startTime).toLocaleDateString("en-US")}
                      </b>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <Link to={`/reportContent/${reportI?._id}`}>
                  <div className="title">
                    {reportI?.reportName ? (
                      <span>{reportI?.reportName}</span>
                    ) : (
                      "reportName"
                    )}
                  </div>
                </Link>
                <div className="button_delete">
                  <button
                    onClick={() => {
                      xoaReport(reportI._id);
                    }}
                  >
                    Xóa báo cáo
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
        
      </div>
    </>
  );
}
export default ReportManager;
