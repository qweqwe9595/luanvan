import "./reports.scss";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function Reports() {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (!user) return;
    socket?.on("getReport", (data) => {
      setReports(data);
    });
  }, [user, socket]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reports/getone/${reports._id}`
        );
        setReports(res.data.reports);
        console.log(res.data.reports);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user]);

  return (
    <div className="reports">
      <div className="reports-title">
        <h3>Báo cáo gần đây</h3>
      </div>
      {reports.length > 0 ? (
        reports?.map((item) => {
          const a = new Date();
          const b = new Date(item?.createdAt);
          const timepost = (a - b) / 1000;
          return (
            <div className="reports-list">
              <Link to={`${item.post}`}>
                <div className="reports-items">
                  <p>
                    <Link to={`/profile/${item?.userId?._id}`}>
                      <span className="username">
                        {`${item?.userId?.userName}`}{" "}
                      </span>
                    </Link>
                    đã {`${item?.message}`} bài viết của bạn -- 
                    <span>
                      {(() => {
                        switch (true) {
                          case timepost < 60:
                            return (
                              <span> {Math.round(timepost)} giây trước</span>
                            );
                          case timepost >= 60 && timepost < 60 * 60:
                            return (
                              <span>
                                 {Math.round(timepost / 60)} phút trước
                              </span>
                            );
                          case timepost >= 60 * 60 && timepost < 60 * 60 * 24:
                            return (
                              <span>
                                 {Math.round(timepost / (60 * 60))} giờ trước
                              </span>
                            );
                          case timepost >= 60 * 60 * 24 &&
                            timepost < 60 * 60 * 24 * 7:
                            return (
                              <span>
                                 {Math.round(timepost / (60 * 60 * 24))} ngày
                                trước
                              </span>
                            );
                          case timepost >= 60 * 60 * 24 * 7 &&
                            timepost < 60 * 60 * 24 * 7 * 4:
                            return (
                              <span>
                                 {Math.round(timepost / (60 * 60 * 24 * 7))} tuần
                                trước
                              </span>
                            );
                          default:
                            return (
                              <span>
                                {Math.round(timepost / (60 * 60 * 24 * 7 * 4))}{" "}
                                tháng trước
                                {timepost}
                              </span>
                            );
                        }
                      })()}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="none">Không có báo cáo nào !</div>
      )}
    </div>
  );
}

export default Reports;
