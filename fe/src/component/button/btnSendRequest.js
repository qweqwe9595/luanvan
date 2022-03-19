import React, { useState, useEffect } from "react";
import "./btnSendRequest.scss";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
function SearchResultTag({ id }) {
    const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
    const sendRequest = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${id}`, {
        userId: userIdCurrent
      })
      .then((res) => {
        alert("đã gửi yêu cầu thành công");
      })
      .catch((err) => {
        
      });
  }; 
    return (
    <button className="icon" onClick={() => sendRequest()}>
         <FaUserPlus/>  
    </button>
  
        
  );
}
export default SearchResultTag;
