import React from "react";
import "./comment.scss";

function CommentV2({commentV2}) {
  const a = new Date();
  const b = new Date(commentV2.createdAt);
  const commentDate = (a - b) / 1000;

  return (
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
   
  );
}

export default CommentV2;
