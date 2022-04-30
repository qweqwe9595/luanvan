import React from "react";
import { useEffect, useState,useContext } from "react";
import { AiOutlineDelete, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiSearch, BiUser, BiUserPlus } from "react-icons/bi";
import { MdOutlineGroups } from "react-icons/md";
import "./SettingConversation.scss";
import PartnerInfo from "../partnerInfo/PartnerInfo";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import PartnerGroupt from "../partnerGroupt/PartnerGroupt";
function SettingConversation({myConversation}) {
  const [me] = useContext(UserContext);
  const [more, setMore] = useState(false);
    // xóa hội thoại
  const deleteConver = () => {
    axios
      .delete(`http://localhost:5000/api/conversations/delete/${myConversation?._id}`,
    {
       headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
            window.location.reload();
     })
      .catch((err) => {
        console.log(err.response);
      });
  }
  
  return (
     <div className="setting_conversation">
          <div className="partner_info">
              {myConversation?.members?.length > 2 ? (
            <div className="group_info">
              {myConversation?.img?.length === 0 ? (
            <img
               className="mess_cent_avt"
            src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
              alt=""
            />
          ) : (
            <img
               className="mess_cent_avt"
              src={`http://localhost:5000/images/${myConversation?.img}`}
              alt=""
            />
          )}
            <div className="members">
            <p>{myConversation.conversationName}</p>
            <span>{ myConversation.members.length} thành viên</span>
              </div>
            </div>
          ) : (
            <div>
                {myConversation?.members?.map((partners, index) => (
                  partners === me?._id ? "" : (
                    <div key={index}>
                    <PartnerInfo partners={partners}></PartnerInfo>
                    </div>
                   
                )))}            
            </div>
          )}
      </div>
      {myConversation?.members?.length > 2 ? (
        <>
          <div className="add"
          onClick={()=>{setMore(!more)}}>
              <BiUser></BiUser>
          <span>{myConversation?.members?.length} thàn viên</span>
          </div>
          {more ? (
            <div className="partner_box">
            {myConversation?.members?.map((partners, index) => (
                  partners === me?._id ? "" : (
                    <div className="partner_goupt" key={index}>
                   <PartnerGroupt partners={partners}></PartnerGroupt>
                    </div>  
                )))}        
          </div>
          ):""}
          
        </>
           
        
        ) : ""}
        <div className="add">
              <BiUserPlus></BiUserPlus>
              <span>Thêm bạn vào hội thoại này</span>
          </div>
          
        <div className="add">
          <AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>
              <span>Tạo nhóm với người này</span>
        </div>
        <div className="add">
         <MdOutlineGroups></MdOutlineGroups>
              <span>Thêm vào nhóm</span>
          </div>
          <div className="add"
          onClick={() =>deleteConver()}>
          <AiOutlineDelete></AiOutlineDelete>
              <span>Xóa lịch sử trò chuyện</span>
          </div>
    </div>
  )
}

export default SettingConversation