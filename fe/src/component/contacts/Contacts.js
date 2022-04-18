import "./Contacts.scss";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

function Contacts({ onlineFriends }) {
  console.log(onlineFriends);
  return (
    <>
      {
      onlineFriends?.length !==0 ?(
      <div className="contacts">
      <p>Đang hoạt động</p>
      {onlineFriends.map((friend, index) => (
        <div key={index} className="contacts_tag">
          <img
            src={
              friend?.photos?.avatar[0]
                ? `http://localhost:5000/images/${friend?.photos?.avatar[0]}`
                : "/stocks/img/avatar/avatarDefault.jpg"
            }
            className="contacts_tag_avt"
          />
          <span>{friend?.userName}</span>
          <div className="contacts-notifications">
            <span>3</span>
          </div>
          <div className="signal"></div>
        </div>
      ))}
    </div>
    ) :""}
  </>  
  );
}
export default Contacts;
