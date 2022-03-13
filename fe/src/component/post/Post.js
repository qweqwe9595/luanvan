import React, { useState, useEffect } from "react";
import "./post.scss";
import axios from "axios";
import { FiShare2 } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";

function Post({ postInfo }) {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const iconStyles = { color: "#0d47a1", fontSize: "25px" };
  return (
    <div className="post">
      <div className="post-meta">
        <div className="post-meta-left">
          <div className="post-meta-left-avatar">
            <img src="https://dep365.com/wp-content/uploads/2021/07/Post-from-imjanedeleon-rsgym6-800x470.jpg"></img>
          </div>
          <div className="post-meta-left-username-timepost">
            <div className="post-meta-left-username">
              <p>{postInfo.userId.email}</p>
            </div>
            <div className="post-meta-left-timepost">
              <p>{postInfo.userId.updatedAt}</p>
            </div>
          </div>
        </div>
        <div className="post-meta-right">
          <div className="post-meta-right-options">
            <button>
              <span>...</span>
            </button>
          </div>
        </div>
      </div>
      <div className="post-desc">
        <p>{postInfo.desc}</p>
      </div>
      <div className="post-img">
        {/* <img src="https://media.moitruongvadothi.vn/images/2022/02/21/9860-1645409694-dai-hoc-can-tho.jpg"></img> */}
      </div>
      <div className="post-interaction">
        <div className="post-interaction-heart">
          <IoMdHeartEmpty style={iconStyles}></IoMdHeartEmpty>
          <p>{postInfo.likes.length}</p>
        </div>
        <div className="post-interaction-comment">
          <GoComment style={iconStyles}></GoComment>
          <p>{postInfo.comments.length}</p>
        </div>
        <div className="post-interaction-share">
          <FiShare2 style={iconStyles}></FiShare2>
          <p>100</p>
        </div>
      </div>
      <div className="post-comment-list">
        <p>Các bình luận trước đó</p>
        <div className="post-comment-list-item"></div>
        <div className="post-comment-bar">
          <div className="post-comment-bar-text">
            <input type="text" placeholder="Viết bình luận của bạn..."></input>
          </div>
          <div className="post-comment-bar-btn">
            <span>ĐĂNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
