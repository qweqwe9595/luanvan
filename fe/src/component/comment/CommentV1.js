import React, { useState } from "react";
import "./comment.scss";
import CommentV2 from "../comment/CommentV2";
import { useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from "axios";

function CommentV1({commentV1}) {
  const [open, setOpen] = useState(false);
  const commentV2 = commentV1.comment.commentLv2;
  const commentId = commentV1.comment._id;
  const userId = useParams().userId;
  const postId = commentV1.postId;
  const a = new Date();
  const b = new Date(commentV1.comment.createdAt);
  const commentDate = (a - b) / 1000;
  const iconStyles = { color: "#0d47a1", fontSize: "20px" };

  const [cmtV2, setCmtV2] = useState("");

  const writeCommentV2= () => {
    axios
      .post("http://localhost:5000/api/comments/commentlv2", {
        commentLv1: commentId,
        postId: postId,
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

  return (
    <div>
       <div className="comment">
        <div className="comment-tag">
         <div className="avatar">
           <img src="https://dep365.com/wp-content/uploads/2021/07/Post-from-imjanedeleon-rsgym6-800x470.jpg"></img>
         </div>
          <div className="comment-tag-username">
          <p>{commentV1.comment.userId}</p>
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
          <p>{commentV1.comment.message}</p>      
      </div>      
    </div>
    <div className="post-interaction-2">
        <div className="post-interaction-heart">
            <IoMdHeart style={iconStyles}/>
            <p>...</p>
        </div>
        <div className="post-interaction-comment" onClick={() => {setOpen(true);}}>
            <GoComment style={iconStyles}/>
            <p> {commentV2.length}</p>
        </div>
      </div>
    {open ? (
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
    }
      {commentV2 ? 
        <div>
        {commentV2.map((comment) => {
              return <CommentV2 key={comment._id} commentV2={comment}/>;
            })}
        </div>
        :""
        }
            </div>

    );
   
}

export default CommentV1;
