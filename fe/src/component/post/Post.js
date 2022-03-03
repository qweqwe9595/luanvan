import React, { useState, useEffect } from "react";
import "./post.scss";
import axios from "axios";
import { FaHeart, FaComments, FaShare } from "react-icons/fa";

function Post() {
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getUserPost = () => {
      axios
        .get(`http://localhost:5000/api/posts/timeline/${userId}`)
        .then((res) => {
          console.log(res.data);
          setUserPost(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
  }, []);

  return (
    <div className="post">
      <div className="post-meta">
        <div className="post-meta-avatar">
          <img src="https://dep365.com/wp-content/uploads/2021/07/Post-from-imjanedeleon-rsgym6-800x470.jpg"></img>
        </div>
        <div className="post-meta-username-timepost">
          <div className="post-meta-username">
            <p>Username</p>
          </div>
          <div className="post-meta-timepost">
            <p>đã đăng Timepost</p>
          </div>
        </div>
        <div className="post-meta-options">
          <button>...</button>
        </div>
      </div>
      <div className="post-desc">
        <p>Write something....</p>
      </div>

      <div className="post-img">
        <img src="https://media.moitruongvadothi.vn/images/2022/02/21/9860-1645409694-dai-hoc-can-tho.jpg"></img>
      </div>
      <div className="post-interaction">
        <h3>
          <FaHeart></FaHeart> (100)
        </h3>
        <h3>
          <FaComments></FaComments> (100)
        </h3>
        <h3>
          <FaShare></FaShare> (100)
        </h3>
      </div>
      <div className="post-comment-list">
        <p>Các bình luận trước đó</p>
        <div className="post-comment-list-item"></div>
        <div className="post-comment-bar">
          <div className="post-comment-bar-text">
            <input type="text" placeholder="Viết bình luận của bạn..."></input>
          </div>
          <div className="post-comment-bar-btn">
            <span>Đăng</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
