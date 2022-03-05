import React, { useEffect, useState } from "react";
import "./UserIntro.scss";
import { FaUserAlt, FaBirthdayCake } from "react-icons/fa";

import { HiUserGroup } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { MdWhereToVote } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import Axios from "axios";
const [username, setUsername] = useState("");
function UserIntro() {
    return (
        <div className="User_Intro">
            <p>Chỉnh sửa thông tin cá nhân</p>
            <hr></hr>
            <div className="intro">
                <div className="userInfos">
                    <div className="left">
                        <FaUserAlt></FaUserAlt>
                          <span>Tên</span>
                    </div>
                     <input type="text"></input>
                </div>
                <div className="userInfos">
                    <div className="left">
                        <RiFileUserFill></RiFileUserFill>
                        <span>MSSV</span>
                    </div>
                    <input type="text"></input>
                </div>
                <div className="userInfos">
                    <div className="left">
                        <FaBirthdayCake></FaBirthdayCake>
                        <span>Ngày sinh</span>
                    </div>
                     <input type="text"></input>
                </div>
                <div className="userInfos">
                    <div className="left">
                        <HiUserGroup></HiUserGroup>
                         <span>Lớp</span>
                    </div>
                     <input type="text"></input>
                </div>
                <div className="userInfos">
                    <div className="left">
                        <GiGraduateCap></GiGraduateCap>
                          <span>Ngành</span>
                    </div>
                     <input type="text"></input>
                </div>
                <div className="userInfos">
                    <div className="left">
                        <MdWhereToVote></MdWhereToVote>
                        <span>Quê quán</span>
                    </div>
                     <input type="text"></input>
                </div>

            </div>

            <button>Chỉnh sửa thông tin</button>

        </div>
    );
}
export default UserIntro;