import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";

function Share() {
  return (
    <div className="share">
      <img
        src="https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg"
        alt=""
      />
      <input type="text" placeholder="Write something..." />
      <div className="share-right">
        <FaPhotoVideo className="share-img"></FaPhotoVideo>
        <div className="share-btn">
          <FaRegPaperPlane />;
          <span>POST!</span>
        </div>
      </div>
    </div>
  );
}

export default Share;
