// import { useDebugValue } from "react";
import "./friendrequest.scss";
function FriendRequest() {
  return (
    <div className="friend_request">
      <p>Friend Requests</p>
      <div className="friends_request_tag">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O0zb-Xpon0-VQfC_5QSnKzDObObyD2Tc0Q&usqp=CAU"
          className="avt_friend_request"
        ></img>
        <div className="friend_request_tag_info">
          <span>Nguyễn Trung Toàn</span>
          <div className="friend_request_tag_button">
            <button type="button" className="button_accept">Chấp nhận</button>
            <button type="button" className="button_refuse">Từ chối</button>
          </div>
        </div>
      </div>
      <div className="friends_request_tag">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O0zb-Xpon0-VQfC_5QSnKzDObObyD2Tc0Q&usqp=CAU"
          className="avt_friend_request"
        ></img>
        <div className="friend_request_tag_info">
          <span>Nguyễn Trung Toàn</span>
          <div className="friend_request_tag_button">
            <button type="button" className="button_accept">Chấp nhận</button>
            <button type="button" className="button_refuse">Từ chối</button>
          </div>
        </div>
      </div>
      <div className="friends_request_tag">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O0zb-Xpon0-VQfC_5QSnKzDObObyD2Tc0Q&usqp=CAU"
          className="avt_friend_request"
        ></img>
        <div className="friend_request_tag_info">
          <span>Nguyễn Trung Toàn</span>
          <div className="friend_request_tag_button">
            <button type="button" className="button_accept">Chấp nhận</button>
            <button type="button" className="button_refuse">Từ chối</button>
          </div>
        </div>
      </div>
      <div className="link">
          <a href="#friends.js">Xem thêm</a>
      </div>
    </div>
  );
}
export default FriendRequest;
