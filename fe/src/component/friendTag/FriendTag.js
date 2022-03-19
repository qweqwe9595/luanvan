import React, { useState, useEffect } from "react";
import "./FriendTag.scss";
import axios from "axios";
function FriendTag({ friend }) {
  const [friendInfo, setFriendInfo] = useState([]);
  useEffect(() => {
    const getFRequests = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${friend}`)
        .then((res) => {
          setFriendInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getFRequests();
  }, []);
  const userId = localStorage.getItem("userID");
  const unfriend = () => {
    axios
        .patch(`http://localhost:5000/api/users/unfriend/${userId}`,
            friend)
      .then((res) => {
        alert("xóa thành công");
      })
      .catch((err) => {});
  };
  console.log();
  return (
    <div className="friend_tag">
      <img
        src="https://gamek.mediacdn.vn/thumb_w/600/2017/smile-emojis-icon-facebook-funny-emotion-women-s-premium-long-sleeve-t-shirt-1500882676711.jpg"
        className="avt_friend_request"
      />
      <div className="userinfo">
        <p>{friendInfo.userName ? friendInfo.userName : ""}</p>
        <span>{friendInfo.email ? friendInfo.email : ""}</span>
      </div>

      <div className="friend_button">
        <button
          type="button"
          onClick={() => {
            unfriend();
          }}
        >
          Xóa bạn
        </button>
      </div>
    </div>
  );
}
export default FriendTag;
