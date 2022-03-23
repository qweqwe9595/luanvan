import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Request.scss";
import { FaSearchDollar } from "react-icons/fa";

function Request({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const userId = localStorage.getItem("userID");
  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users//getone/${user}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  const RequesAccept = () => {
    axios
      .patch(`http://localhost:5000/api/users/accept/${user}`, {
        userId
      })
      .then((res) => {
        alert("đã đồng ý");
      })
      .catch((err) => {
         console.log(err.response);
      });
  };

  const RequestRefuse = () => {
    axios
      .patch(`http://localhost:5000/api/users/refuse/${user}`, {
        userId
      })
    .then((res) => {
        alert("đã từ chuối");
      })
      .catch((err) => {
         console.log(err.response);
      });
  };
  return (
    <div className="friends_request_tag">
      <img
        src="https://gamek.mediacdn.vn/thumb_w/600/2017/smile-emojis-icon-facebook-funny-emotion-women-s-premium-long-sleeve-t-shirt-1500882676711.jpg"
        className="avt_friend_request"
      />
      <div className="friend_request_tag_info">
        <span>{userInfo.userName ? userInfo.userName : ""}</span>
        <div className="friend_request_tag_button">
          <button
            type="button"
            className="button_accept"
            onClick={() => {
              RequesAccept();
            }}
          >
            Chấp nhận
          </button>

          <button type="button" className="button_refuse"
            onClick={() => {
              RequestRefuse();
            }}>
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
}
export default Request;
