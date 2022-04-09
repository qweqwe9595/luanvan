import "./notifications.scss";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Notifications() {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;
    socket?.on("getNotification", (data) => {
      setNotifications(data);
    });
  }, [user, socket]);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/getone/${user._id}`
        );
        setNotifications(res.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user]);
  return (
    <div className="notifications">
      <div className="notifications-title">
        <h3>Thông báo gần đây</h3>
      </div>
      <div className="notifications-list">
        {notifications?(notifications.map((item) => (
          <Link to={`${item.post}`}>
            <div className="notifications-items">
              <p>
                  <Link to={`/profile/${item.userId._id}`}>
                    <span className="username">{`${item.userId.userName}`} </span>
                  </Link>
                  đã {`${item.message}`} bài viết của bạn.
                </p>
              </div>
            </Link>
        ))):(<p>Không có thông báo nào !</p>)}
      </div>
      {window.location.pathname !== "/notification"?(
        <div className="notifications-all">
        <Link to={`/notification`}>
          <p>Xem tất cả</p>
        </Link>
      </div>
      ):""}
        
    </div>
  );
}

export default Notifications;
