import React, { useState } from "react";
import "./comment.scss";
import { useParams, Link } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from "axios";

function CommentV2({ commentV2, commentLv1 }) {
  console.log(commentLv1);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(commentV2.like.length);
  const a = new Date();
  const b = new Date(commentV2.createdAt);
  const commentDate = (a - b) / 1000;
  const [open, setOpen] = useState(false);
  const iconStyles = { color: "#0d47a1", fontSize: "20px" };

  const commentId = commentV2.commentLv1;
  const userId = localStorage.getItem("userID");
  const [cmtV2, setCmtV2] = useState("");
  const writeCommentV2 = () => {
    axios
      .post("http://localhost:5000/api/comments/commentlv2", {
        commentLv1: commentId,
        postId: commentLv1.postId,
        message: cmtV2,
        userId: userId,
      })
      .then((res) => {
        console.log("Thanh cong", res.data);
        alert("Binh luan thanh cong!");
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };
  const like = () => {
    const Id = localStorage.getItem("userID");
    setLiking(true);
    setLikes(likes + 1);
    axios.patch(
      `http://localhost:5000/api/comments/like/commentlv2/${commentV2._id}`,
      {
        userId: Id,
      }
    );
  };

  const disLike = () => {
    setLiking(false);
    setLikes(likes - 1);
    setLiking();
    const Id = localStorage.getItem("userID");
    axios.patch(
      `http://localhost:5000/api/comments/like/commentlv1/${commentV2._id}`,
      {
        userId: Id,
      }
    );
  };
  return (
    <>
      <div className="comment-2">
        <div className="comment-tag">
          <div className="avatar">
            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"></img>
          </div>
          <div className="comment-tag-username">
          <Link to={`/profile/${commentV2.userId?._id}`}>
              <p className="username">{commentV2.userId?.userName}</p>
            </Link>
          </div>
          <div className="comment-tag-timepost">
            {(() => {
              switch (true) {
                case commentDate < 60:
                  return <p>{Math.round(commentDate)} giây trước</p>;
                case commentDate >= 60 && commentDate < 60 * 60:
                  return <p>{Math.round(commentDate / 60)} phút trước</p>;
                case commentDate >= 60 * 60 && commentDate < 60 * 60 * 24:
                  return <p>{Math.round(commentDate / (60 * 60))} giờ trước</p>;
                case commentDate >= 60 * 60 * 24 &&
                  commentDate < 60 * 60 * 24 * 7:
                  return (
                    <p>{Math.round(commentDate / (60 * 60 * 24))} ngày trước</p>
                  );
                case commentDate >= 60 * 60 * 24 * 7 &&
                  commentDate < 60 * 60 * 24 * 7 * 4:
                  return (
                    <p>
                      {Math.round(commentDate / (60 * 60 * 24 * 7))} tuần trước
                    </p>
                  );
                default:
                  return (
                    <p>
                      {Math.round(commentDate / (60 * 60 * 24 * 7 * 4))} tháng
                      trước
                    </p>
                  );
              }
            })()}
          </div>
        </div>
        <div className="comment-tag-message">
          <p><span>{commentLv1?.userId?.userName}</span> {commentV2.message}</p>
        </div>
        <div className="post-interaction-3">
          <div className="post-interaction-heart-3">
            {liking ? (
              <IoMdHeart style={iconStyles} onClick={() => disLike()} />
            ) : (
              <IoMdHeartEmpty style={iconStyles} onClick={() => like()} />
            )}
            <p>{likes}</p>
          </div>
          <div
            className="post-interaction-comment-3"
            onClick={() => {
              setOpen(true);
            }}
          >
            <GoComment style={iconStyles} />
            <p> {commentV2?.length}</p>
          </div>
        </div>
      </div>
      {open ? (
        <div className="post-comment-bar-3">
          <div className="post-comment-bar-text-3">
            <input
              type="text"
              placeholder="Viết bình luận của bạn..."
              value={cmtV2}
              onChange={(e) => {
                setCmtV2(e.target.value);
              }}
            ></input>
          </div>
          <div
            className="post-comment-bar-btn-3"
            onClick={() => {
              writeCommentV2();
            }}
          >
            <span>ĐĂNG</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CommentV2;
