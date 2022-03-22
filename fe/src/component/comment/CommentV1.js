import React, { useState } from "react";
import "./comment.scss";
import CommentV2 from "../comment/CommentV2";

function CommentV1({commentV1}) {
  const commentV2 = commentV1.comment.commentLv2;
  console.log("comment v2",commentV2);
  const a = new Date();
  const b = new Date(commentV1.comment.createdAt);
  const commentDate = (a - b) / 1000;
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
