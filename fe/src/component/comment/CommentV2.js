import React, { useState } from "react";
import "./comment.scss";
import { useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from "axios";

function CommentV2({commentV2}) {
  const a = new Date();
  const b = new Date(commentV2.createdAt);
  const commentDate = (a - b) / 1000;
  const [open, setOpen] = useState(false);
  const iconStyles = { color: "#0d47a1", fontSize: "20px" };

  const commentId = commentV2.commentLv1;
  const userId = useParams().userId;
  const [cmtV2, setCmtV2] = useState("");
  // const writeCommentV2= () => {
  //   axios
  //     .post("http://localhost:5000/api/comments/commentlv2", {
  //       commentLv1: commentId,
  //       postId: postId,
  //       message: cmtV2,
  //       userId: userId,
  //     })
  //     .then((res) => {
  //       console.log("Thanh cong", res.data);
  //       alert("Binh luan thanh cong!");
  //     })
  //     .catch((err) => {
  //       console.log("Loi roi", err.response.data.message);
  //     });
  // };
  return (
    <>
    <div className="comment-2">
    <div className="comment-tag">
      <div className="avatar">
        <img src="https://dep365.com/wp-content/uploads/2021/07/Post-from-imjanedeleon-rsgym6-800x470.jpg"></img>
      </div>
      <div className="comment-tag-username">
        <p>{commentV2.userId}</p>
      </div>
      <div className="comment-tag-timepost">
            {(() => {
              switch (true) {
                case commentDate < 60:
                  return <p>{Math.round(commentDate)} giây trước</p>;
                case commentDate >= 60 && commentDate < (60 * 60):
                  return <p>{Math.round(commentDate / 60)} phút trước</p>;
                case commentDate >= (60 * 60) && commentDate < (60 * 60 * 24):
                  return <p>{Math.round(commentDate / (60 * 60))} giờ trước</p>;
                case commentDate >= (60 * 60 * 24) && commentDate < (60 * 60 * 24 * 7):
                  return <p>{Math.round(commentDate / (60 * 60 * 24))} ngày trước</p>;
                case commentDate >= (60 * 60 * 24 * 7) && commentDate < (60 * 60 * 24 * 7 * 4) :
                  return <p>{Math.round(commentDate / (60 * 60 * 24 * 7))} tuần trước</p>;
                default:
                  return <p>{Math.round(commentDate / (60 * 60 * 24 * 7 * 4))} tháng trước</p>;
              }
            })()}
          </div>
    </div>
    <div className="comment-tag-message">
        <p>{commentV2.message}</p>      
    </div>
    </div>
    <div className="post-interaction-3">
    <div className="post-interaction-heart">
        <IoMdHeart style={iconStyles}/>
        <p>...</p>
    </div>
    <div className="post-interaction-comment" onClick={() => {setOpen(true);}}>
        <GoComment style={iconStyles}/>
        <p> {commentV2.length}</p>
    </div>
  </div>
    {/* {open ? (
      <div className="post-comment-bar">
      <div className="post-comment-bar-text">
        <input
          type="text"
          placeholder="Viết bình luận của bạn..."
          value={cmtV2}
          onChange={(e) => {
            setCmtV2(e.target.value);
          }}
        ></input>
      </div>
      <div className="post-comment-bar-btn" onClick={() => {writeCommentV2();}}>
        <span>ĐĂNG</span>
      </div>
    </div>
    ): ""
    } */}
   </>
  );
}

export default CommentV2;
