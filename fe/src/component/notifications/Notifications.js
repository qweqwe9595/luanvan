import "./notifications.scss";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Notifications() {
  return (
    <div className="notification-items">
        <div className="notification-top">
            <img src="fe\public\stocks\img\avatar\avatarDefault.jpg"></img>
            <p>username</p>
            <p>timepost</p>
        </div>
    </div>
  );
}

export default Notifications;
