import React from "react";
import "./infos.scss";
import { FaUserAlt,FaBirthdayCake } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { MdWhereToVote } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import "./infos.scss";

function Infos() {
  return (
    <div className="info">
            <p>Giới thiệu</p>
            <div className="info_tag">
                <FaUserAlt></FaUserAlt>
                <p>Tên</p>
                <span>Nguyễn Trung Toàn</span>
            </div>
            <div className="info_tag">
                <RiFileUserFill></RiFileUserFill>
                <p>MSSV </p>
                <span>B1805824</span>
            </div>
            <div className="info_tag">
                <FaBirthdayCake></FaBirthdayCake>
                <p>Ngày sinh </p>
                <span>01/01/2000</span>
            </div>
            <div className="info_tag">
                <HiUserGroup></HiUserGroup>
                <p>Lớp </p>
                <span>DI1896A1</span>
            </div>
            <div className="info_tag">
                <GiGraduateCap></GiGraduateCap>
                <p>Ngành </p>
                <span>Kỹ thuật phần mềm K44</span>
            </div>
            <div className="info_tag">
                <MdWhereToVote></MdWhereToVote>
                <p>Quê quán </p>
                <span>Đồng Tháp</span>
          </div>
         <button>Chỉnh sửa thông tin</button>
    
        </div>
  );
}

export default Infos;
