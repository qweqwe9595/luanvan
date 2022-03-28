import React from "react";
import "./option.scss";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaUserTie,
  FaBook,
} from "react-icons/fa";

function Options() {
  return (
    <div className="options">
      <div className="options-container">
        <div className="tag">
          <FaComments className="tag-icon" />
          <span>Trò chuyện</span>
        </div>
        <hr className="hr" />
        <Link to={"/friend"}>
          <div className="tag">
            <FaUserFriends className="tag-icon" />
            <span>Bạn bè</span>
          </div>
        </Link>
        <hr className="hr" />
        <div className="tag">
          <FaCalendarAlt className="tag-icon" />
          <span>Tin tức sự kiện</span>
        </div>
        <hr className="hr" />
        <div className="tag">
          <FaUserTie className="tag-icon" />
          <span>Thực tập tuyển dụng</span>
        </div>
        <hr className="hr" />
        <div className="tag">
          <FaBook className="tag-icon" />
          <span>Tài liệu</span>
        </div>
      </div>
    </div>
  );
}

export default Options;
