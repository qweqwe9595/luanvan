import React, { useState, useEffect } from "react";
import "./btnSendRequest.scss";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
function SearchResultTag({ id, setResetSearch }) {
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [requested, setRequested] = useState(false);
    const sendRequest = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${id}`, {
        userId: userIdCurrent
      })
      .then((res) => {
        // alert("đã gửi yêu cầu thành công");
      })
      .catch((err) => {
        
      });
  }; 
  return (
    <div>
      {!requested ? (
         <button type="button" className="icon"
              onClick={() => {
                sendRequest();
                setRequested(true);
                setResetSearch(true);
          }}>
          <FaUserPlus/>
            </button>
      )   
        : (
          <p className="friend-wait">Đã gửi lời mời kết bạn.</p>

        // <button type="button" className="icon2">
        //   <FaUserPlus/>
        // </button>
        )
      }
  </div>
    
        
  );
}
export default SearchResultTag;
