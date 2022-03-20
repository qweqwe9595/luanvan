import React, { useState, useEffect } from "react";
import "./post.scss";
import axios from "axios";
import { FiShare2 } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import {useParams } from "react-router-dom";

function Post({ postInfo }) {
  const userId = useParams().userId;
  const postId = postInfo._id;
  const [open, setOpen] = useState(false);
  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;
  const a = new Date();
  const b = new Date(postInfo.createdAt);
  const postDate = (a - b)/1000;

  const iconStyles = { color: "#0d47a1", fontSize: "25px" };

  const addLike = () => {
    axios. post(`http://localhost:5000/api/posts/like/${postId}`, {
          userId: userId,
        })
        .then((res) => {
          console.log(res.data);
          console.log("đã like");
        })
       .catch((err) => {
          console.log(err.response.data.message);
        });
    };
  
  return (
    <div className="post">
      <div className="post-meta">
        <div className="post-meta-left">
          <div className="post-meta-left-avatar">
            <img src="https://dep365.com/wp-content/uploads/2021/07/Post-from-imjanedeleon-rsgym6-800x470.jpg"></img>
          </div>
          <div className="post-meta-left-username-timepost">
            <div className="post-meta-left-username">
              <p>{postInfo.userId.userName}</p>
            </div>
            <div className="post-meta-left-timepost">
            {(() => {
              switch (true) {
                case (postDate < 60):
                  return (<p>{postDate} giây trước</p>)
                case (postDate >= 60 && postDate < (60*60) ):
                  return (<p>{postDate/60} phút trước</p>)
                case (postDate >= (60*60) && postDate < (60*60*24) ):
                  return (<p>{postDate/60*60} giờ trước</p>)
                case (postDate >= (60*60*24) && postDate < ( 60*60*24*7 )):
                  return (<p>{postDate/(60*60*24)} ngày trước</p>)
                case (postDate >= (60*60*24*7) && postDate < (60*60*24*7*4) ):
                  return (<p>{postDate/(60*60*24*7)} tuần trước</p>)
                default:
                  return (<p>{postDate/(60*60*24*7*4)} tháng trước</p>)
            }}
            )()}
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
        <div className="post-interaction-heart" onClick={() => addLike()}>
            <IoMdHeartEmpty style={iconStyles}></IoMdHeartEmpty>
         <p>{postInfo.likes.length}</p>
        </div>
        <div className="post-interaction-comment">
          <span onClick={() => {setOpen(true);}}>
            <GoComment style={iconStyles}></GoComment>
          </span>
          <p>{postInfo.comments.length}</p>          
        </div>
        <div className="post-interaction-share">
          <FiShare2 style={iconStyles}></FiShare2>
          <p>100</p>
        </div>        
      </div>
      {(postInfo.likes.length > 0) ? 
      <div className="post-interaction-name">
        <p>{postInfo.likes} đã like</p>
      </div> : ""}
      
      {open ? <div className="post-comment-list">        
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
    </div> : ""}

    </div>
  );
}

export default Post;
