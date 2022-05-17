import React, { useContext } from "react";
import "./option.scss";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import {GrUserAdmin} from "react-icons/gr";
import {
  FaComments,
  FaKey,
  FaUserFriends,
  FaCalendarAlt,
  FaUserTie,
  FaBook,
} from "react-icons/fa";

function Options() {
  const [user] = useContext(UserContext);
  return (
    <div className="options">
      <div className="options-container">
        <Link to={"/message"}>
          <div className="tag">
            <FaComments className="tag-icon" />
            <span>Trò chuyện</span>
          </div>
        </Link>
        <hr className="hr" />
        <Link to={"/friend"}>
          <div className="tag">
            <FaUserFriends className="tag-icon" />
            <span>Bạn bè</span>
          </div>
        </Link>
        <hr className="hr" />
        <Link to={"/event"}>
          <div className="tag">
            <FaCalendarAlt className="tag-icon" />
            <span>Tin tức - Sự kiện</span>
          </div>
        </Link>
        <hr className="hr" />
        <Link to={"/job"}>
          <div className="tag">
            <FaUserTie className="tag-icon" />
            <span>Thực tập - Tuyển dụng</span>
          </div>
        </Link>
        <hr className="hr" />
        <Link to={"/document"}>
          <div className="tag">
            <FaBook className="tag-icon" />
            <span>Tài liệu học tập</span>
          </div>
        </Link>
        {user?.isAdmin?(
          <>
          <hr className="hr" />
        <Link to={"/admin"}>
          <div className="tag">
            <FaKey className="tag-icon" />
            <span>Trang quản trị</span>
          </div>
        </Link>
        </>
        ):""}
       
      </div>
    </div>
  );
}

export default Options;
