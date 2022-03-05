import React, { useEffect, useState } from "react";
import "./infos.scss";
import { FaUserAlt, FaBirthdayCake } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { MdWhereToVote } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import "./infos.scss";
import Axios from "axios";
import UserIntro from "../SettingProfile/UserIntro";

function Infos() {
  const [userInfo, setUserInfo] = useState({});
  // const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getUserInfo = () => {
      Axios.get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => {
          //console.log(res.data.email);
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, [open]);

  return (
    <div className="info">
      <p>Giới thiệu</p>
      <div className="info_tag">
        <FaUserAlt></FaUserAlt>
        <p>Tên</p>
        <span>{userInfo?.userName}</span>
      </div>
      <div className="info_tag">
        <RiFileUserFill></RiFileUserFill>
        <p>MSSV</p>
        <span>{userInfo.MSSV ? userInfo.MSSV : "không có"}</span>
      </div>
      <div className="info_tag">
        <FaBirthdayCake></FaBirthdayCake>
        <p>Ngày sinh </p>
        <span>
          {userInfo.dateOfBirth
            ? new Date(userInfo.dateOfBirth).toLocaleDateString("en-US")
            : ""}
        </span>
      </div>
      <div className="info_tag">
        <HiUserGroup></HiUserGroup>
        <p>Lớp </p>
        <span>{userInfo.major ? userInfo.major.class : ""}</span>
      </div>
      <div className="info_tag">
        <GiGraduateCap></GiGraduateCap>
        <p>Ngành </p>
        <span>
          {" "}
          {userInfo.major ? userInfo.major.majorName : ""} K
          {userInfo.major ? userInfo.major.yearKey : ""}
        </span>
      </div>
      <div className="info_tag">
        <MdWhereToVote></MdWhereToVote>
        <p>Quê quán </p>
        <span>{}</span>
      </div>
      {open ? <UserIntro setOpen={setOpen}></UserIntro> : ""}
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Chỉnh sửa thông tin cá nhân
      </button>
    </div>
  );
}

export default Infos;
