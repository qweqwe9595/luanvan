import React, { useContext } from "react";
import "./notification.scss";
import Nav from "../../component/nav/Nav";
import Notifications from "../../component/notifications/Notifications";

import { Link } from "react-router-dom";

function Notification() {
  return (
    <div>
      <Nav></Nav>
        <div className="notification">
           <Notifications></Notifications>
        </div>
    </div>
  );
}

export default Notification;
