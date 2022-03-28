import React, { useState, useEffect, useContext } from "react";
import "./post.scss";
import axios from "axios";
import { FiShare2 } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import CommentV1 from "../comment/CommentV1";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/userContext";

function Post({ postInfo }) {
  const [open, setOpen] = useState(false);
  const loginUser = localStorage.getItem("userID");
  const postId = postInfo._id;
  const [likesCount, setLikesCount] = useState(postInfo.likes.length);
  const [isLike, setIsLike] = useState(
    postInfo.likes.some((item) => item._id === loginUser)
  );
  const a = new Date();
  const b = new Date(postInfo.createdAt);
  const postDate = (a - b) / 1000;

  const iconStyles = { color: "#0d47a1", fontSize: "25px" };
  const [comment, setComment] = useState([]);
  const commentNumber = countCmts(comment);
  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);

  function countCmts(comment) {
    let lv1Count = comment.length;
    let lv2Count = comment.reduce(
      (prev, current) => prev + current.commentLv2.length,
      0
    );
    return lv1Count + lv2Count;
  }

  useEffect(() => {
    if (postInfo.likes.includes(loginUser)) {
      setIsLike(true);
    }
    const getComment = () => {
      axios
        .get(`http://localhost:5000/api/comments/post/${postId}`)
        .then((res) => {
          setComment(res.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getComment();
  }, []);
  //Lay tat ca comment

  //Like bai viet

  const addLike = () => {
    axios
      .post(`http://localhost:5000/api/posts/like/${postId}`, {
        userId: loginUser,
      })
      .then((res) => {
        console.log(res.data);
        alert("đã like");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const sendNotification = (type) => {
    axios
      .post("http://localhost:5000/api/users/notification", {
        userId: postInfo.userId._id,
        message: "like",
      })
      .then((res) => {
        socket?.emit("sendNotification", {
          receiverUserId: postInfo.userId._id,
          type,
        });
      });
  };

  const [cmtV1, setCmtV1] = useState("");

  const writeCommentV1 = () => {
    axios
      .post("http://localhost:5000/api/comments/commentlv1/", {
        postId: postId,
        message: cmtV1,
        userId: loginUser,
      })
      .then((res) => {
        console.log("Thanh cong", res.data);
        alert("Binh luan thanh cong!");
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  return (
    <div className="post">
      <div className="post-meta">
        <div className="post-meta-left">
          <div className="post-meta-left-avatar">
            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"></img>
          </div>
          <div className="post-meta-left-username-timepost">
            <div className="post-meta-left-username">
              <Link to={`/profile/${postInfo.userId._id}`}>
                <p className="username">{postInfo.userId.userName}</p>
              </Link>
            </div>
            <div className="post-meta-left-timepost">
              {(() => {
                switch (true) {
                  case postDate < 60:
                    return <p>{Math.round(postDate)} giây trước</p>;
                  case postDate >= 60 && postDate < 60 * 60:
                    return <p>{Math.round(postDate / 60)} phút trước</p>;
                  case postDate >= 60 * 60 && postDate < 60 * 60 * 24:
                    return <p>{Math.round(postDate / (60 * 60))} giờ trước</p>;
                  case postDate >= 60 * 60 * 24 && postDate < 60 * 60 * 24 * 7:
                    return (
                      <p>{Math.round(postDate / (60 * 60 * 24))} ngày trước</p>
                    );
                  case postDate >= 60 * 60 * 24 * 7 &&
                    postDate < 60 * 60 * 24 * 7 * 4:
                    return (
                      <p>
                        {Math.round(postDate / (60 * 60 * 24 * 7))} tuần trước
                      </p>
                    );
                  default:
                    return (
                      <p>
                        {Math.round(postDate / (60 * 60 * 24 * 7 * 4))} tháng
                        trước
                      </p>
                    );
                }
              })()}
            </div>
          </div>
        </div>
        <div className="post-meta-right">
          <div className="post-meta-right-options">
            <div className="post-meta-right-options-buttons">
              <span>
                <BsThreeDots></BsThreeDots>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="post-desc">
        <p>{postInfo.desc}</p>
      </div>
      <div className="post-img">
        {postInfo.img && (
          <img src={`http://localhost:5000/images/${postInfo.img}`} />
        )}
      </div>
      <div className="post-interaction">
        <div className="post-interaction-heart" onClick={() => addLike()}>
          {isLike ? (
            <IoMdHeart
              style={iconStyles}
              onClick={() => {
                setLikesCount(likesCount - 1);
                setIsLike(false);
              }}
            />
          ) : (
            <IoMdHeartEmpty
              style={iconStyles}
              onClick={() => {
                setLikesCount(likesCount + 1);
                setIsLike(true);
                sendNotification("LIKE");
              }}
            />
          )}
          <p>{likesCount}</p>
        </div>
        <div className="post-interaction-comment">
          <span
            onClick={() => {
              setOpen(true);
            }}
          >
            <GoComment style={iconStyles}></GoComment>
          </span>
          <p>{commentNumber}</p>
        </div>
        <div className="post-interaction-share">
          <FiShare2 style={iconStyles}></FiShare2>
          <p>100</p>
        </div>
      </div>
      {/* {postInfo.likes.length > 0 ? (
        <div className="post-interaction-name">
          <p>{postInfo.likes.length} đã like</p>
        </div>
      ) : (
        ""
      )} */}

      {open ? (
        <div className="post-comment-list">
          <p>Các bình luận trước đó</p>
          <div className="post-comment-list-item">
            {comment?.map((comment) => {
              return <CommentV1 key={comment._id} commentV1={{ comment }} />;
            })}
          </div>
          <div className="post-comment-bar">
            <div className="post-comment-bar-text">
              <input
                type="text"
                placeholder="Viết bình luận của bạn..."
                value={cmtV1}
                onChange={(e) => {
                  setCmtV1(e.target.value);
                }}
              ></input>
            </div>
            <div
              className="post-comment-bar-btn"
              onClick={() => {
                writeCommentV1();
              }}
            >
              <span>ĐĂNG</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
