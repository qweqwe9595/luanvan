import "./notifications.scss";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/userContext";
import axios from "axios";

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
    <div style={{ margin: "100px 0" }} className="notification-items">
      {notifications.map((item) => (
        <p>{`${item.userId} ${item.message} cua ban`}</p>
      ))}
    </div>
  );
}

export default Notifications;
