import React from "react";
import "./feed.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

function Feed() {
  return (
    <div className="newfeed">
      <h2>This is newnfeed</h2>
      <div className="newfeed-post">
        <div className="newfeed-post-meta">
          <img src="https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg"></img>
          <div className="newfeed-post-meta-name">
            <p className="newfeed-post-meta-name-username">Tên</p>
            <p className="newfeed-post-meta-name-time">12 giờ trước</p>
          </div>
          <button>...</button>
        </div>
        <div className="newfeed-post-text">
          <p>Xin chào mọi người. Chúc một ngày tốt lành.</p>
        </div>
        <div className="newfeed-post-img">
          <img
            src="https://www.ctu.edu.vn/images/upload/images/DHCT_khu_2-01.jpg"
            className="newfeed-post-img-img"
          ></img>
        </div>
        <div className="newfeed-post-interaction">
          <FiShare2 className="newfeed-post-interaction-share"></FiShare2>
          <FaCommentAlt className="newfeed-post-interaction-comment"></FaCommentAlt>
          <AiOutlineHeart className="newfeed-post-interaction-like"></AiOutlineHeart>
        </div>
        <div className="newfeed-comment-list">
          <p>Các bình luận trước đó.</p>
          <p>None</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;
