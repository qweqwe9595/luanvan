import Nav from "../../component/nav/Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestBox from "../../component/friendRequest/requestBox/RequestBox";
import "./Friend.scss";
import FriendTag from "../../component/friendTag/FriendTag";
import Options from "../../component/options/Options";
import Contacts from "../../component/contacts/Contacts";
import FriendRequest from "../../component/friendRequest/FriendRequest";

function Friend(onlineFriends) {
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [fRequests, setFRequests] = useState([]);
  const [friendId, setFriendId] = useState([]);
  const [resetFriend, setResetFriend] = useState(false);

  useEffect(() => {
    const getFRequests = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userIdCurrent}`)
        .then((res) => {
          setFRequests(res.data.friendsRequest);
          setFriendId(res.data.friends);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getFRequests();
  }, []);
  return (
    <div>
      <Nav></Nav>
      <div className="friend">
        <div className="friend_content">
          {fRequests?.length !==0 ? (
             <div className="f_request">
            <p>Lời mời kết bạn</p>
            {fRequests?.map((user, index) => {
              return <RequestBox user={user} key={index}></RequestBox>;
            })}
            {/* <button>Xem tất cả</button> */}
          </div>
          ):""}
         
          {/* <div className="f_request">
            <p>Những người bạn có thể biết</p>
            <button>Xem tất cả</button>
          </div> */}
          {friendId?.length !== 0 ? (
              <div className="f_request">
            <p>Danh sách bạn bè</p>
            {friendId?.map((friend, indexs) => {
              return <FriendTag friend={friend} setResetFriend={setResetFriend} key={indexs}></FriendTag>;
            })}
            {/* <button>Xem tất cả</button> */}
          </div>
          ) :""}         
        </div>
      </div>
    </div>
  );
}

export default Friend;
