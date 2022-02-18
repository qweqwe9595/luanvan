import React from "react";
import './feed.scss';

function Feed() {
  return (
    <div className="newfeed">
    <div className="user-post">
      <div className="post-meta">
        <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" />
        <div className="user-name"><a href="">Vân</a></div>
        <div className="post-time"><span> đã đăng 5 phút trước</span></div>
        <div className="post-menu">
          <div className="post-menu-dropdow">
            <button className="dropbtn">...</button>
          </div>                   
        </div>
      </div>
      <div className="post-content">
        <div className="post-content-text">
          <p>Xin chào....</p>
        </div>
        <div className="post-content-img">
          <img src="https://i0.wp.com/greendiary.com/wp-content/uploads/2020/01/landscape-photography-1.jpg?fit=800%2C534&ssl=1" />
        </div>
      </div>
      <div className="like-comment-share">
        <a href="" className="post-like">Thích</a>
        <a href="" className="post-share">Chia sẻ</a>
        <a href="" className="post-comment">Bình luận</a>
      </div>
      <div className="comment-list">
        <p>Bình luận gần đây</p>
        <div className="comment-list-content">
          <div className="comment-list-content-items">
            <div className="comment-item">
              <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" />
              <div className="user-name"><a href="">Giang</a></div>
              <div className="post-time"><span>đã bình luận 1 phút trước</span></div>
              <div className="comment-content"><p>Phong cảnh rất đẹp.</p></div>
            </div>
            <div className="like-comment">
              <a href="" className="post-comment">Bình luận</a>
              <a href="" className="post-like">Thích</a>
            </div>
          </div>
        </div>
        <div className="comment-list-box">
          <input type="text" placeholder="Viết bình luận..." />
          <a href="">Post</a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Feed;
