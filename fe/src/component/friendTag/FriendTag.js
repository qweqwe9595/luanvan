import React, { useState, useEffect } from "react";
import "./FriendTag.scss";
import axios from "axios";
function FriendTag({ friend }) {
  const [friendInfo, setFriendInfo] = useState([]);
  const [notFriend, setNotFriend] = useState(false);
  console.log(friend);
  useEffect(() => {
    const getFRequests = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${friend._id}`)
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
    window.location.reload();
    axios
      .patch(`http://localhost:5000/api/users/unfriend/${friend._id}`, {
        userId,
      })
      .then((res) => {
        alert("xóa thành công");
      })
      .catch((err) => {});
  };
  const sendRequest = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${friend._id}`, {
        userId,
      })
      .then((res) => {
        //alert("đã gửi yêu cầu thành công");
      })
      .catch((err) => {});
  };
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
        {notFriend ? (
          <button
            type="button"
            onClick={() => {
              sendRequest();
            }}
          >
            Kết bạn
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              unfriend();
              setNotFriend(true);
            }}
          >
            Xóa bạn
          </button>
        )}
      </div>
    </div>
  );
}
export default FriendTag;
