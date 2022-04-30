import React from "react";
import "./MyMess.scss";
function MyMess({ sender }) {
  return (
    <div className="my_mess_content">
      {sender?.sender?.photos?.avatar?.length === 0 ? (
        <img
          className="_avt"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt=""
        />
      ) : (
        <img
          className="_avt"
          src={`http://localhost:5000/images/${
            sender?.sender?.photos?.avatar[
              sender?.sender?.photos?.avatar?.length - 1
            ]
          }`}
          alt=""
        />
      )}
      <div className="my_mess">
        <div className="my_mess_detail">
          <span>{sender.text}</span>
        </div>
        <p>
          {new Date(sender.createdAt).toLocaleTimeString(["it-IT"], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default MyMess;
