import React from "react";
import "./hero.scss";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";

function Hero() {
  const userId = useParams().userId;
  const userRequestId = JSON.parse(localStorage.getItem("userInfo"))._id;

  const addFriend = () => {
    axios.patch(`http://localhost:5000/api/users/add/${userRequestId}`, {
      userId: userId,
    })
    .then((res) => {
     console.log(res.data);
       })
      .catch((err) => {
         console.log(err.response.data.message);
       });
  };

  return (
    <div className="hero">
      <div className="coverpicture-container">
        <img
          className="coverpicture"
          src="https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"
          alt=""
        />
      </div>

      <div className="hero-profile">
        <div className="avatar-container">
          <img
            className="avatar"
            src="https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"
            alt=""
          />
          <AiOutlineCamera className="camera" />
        </div>
        <p className="hero-name">Name</p>
      </div>
      <div className="hero-content">
        <div>Nhắn tin</div>
        {!userId.includes(userRequestId) ? (
        <div className="icon">
          <div onClick={() => addFriend()}>Kết bạn</div>
                    </div>
                  ) : (
                    ""
                  )}
        <div>Dự phòng</div>
      </div>
    </div>
  );
}

export default Hero;
