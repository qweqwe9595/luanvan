import React from "react";
import "./hero.scss";
import { AiOutlineCamera } from "react-icons/ai";

function Hero() {
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
        <div>Kết bạn</div>
        <div>Dự phòng</div>
      </div>
    </div>
  );
}

export default Hero;
