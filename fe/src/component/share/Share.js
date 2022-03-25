import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Share() {
  const userId = localStorage.getItem("userID");
  const [desc, setDesc] = useState("");
  const Share = () => {
    axios
      .post("http://localhost:5000/api/posts", {
        userId: userId,
        desc,
      })
      .then((res) => {
        alert("Đăng bài viết mới thành công.");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  return (
    <div className="share">
      <div className="share-left">
        <Link to={`/profile/${userId}`}>
          <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="" className="avartar"/>            
        </Link>        
      <input
          type="text"
          placeholder="Bạn muốn chia sẻ gì không?"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </div>

      <div className="share-right">
        <FaPhotoVideo className="share-img"></FaPhotoVideo>
        <div
          className="share-btn"
          onClick={() => {
            Share();
          }}
        >
          <FaRegPaperPlane />
          <span>ĐĂNG!</span>
        </div>
      </div>
    </div>
  );
}

export default Share;
