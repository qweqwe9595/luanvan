import React, { useState, useEffect } from "react";
import "./post.scss";
import axios from "axios";
import { FiShare2 } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useParams } from "react-router-dom";
import CommentV1 from "../comment/CommentV1";

function Post({ postInfo }) {
  const userId = useParams().userId;
  const loginUser = localStorage.getItem("userID");
  const postId = postInfo._id;
  const [open, setOpen] = useState();
  const [likesCount, setLikesCount] = useState(postInfo.likes.length);
  // const [commentsCount, setCommentsCount] = useState(postInfo.comment.length);
  const [isLike, setIsLike] = useState(false);
  // const [isComment, setIsComment] = useState(false);
  const a = new Date();
  const b = new Date(postInfo.createdAt);
  const postDate = (a - b) / 1000;

  const iconStyles = { color: "#0d47a1", fontSize: "25px" };
  const [comment, setComment] = useState([]);
  const commentNumber = comment.length + comment?.commentLv2?.length;

  useEffect(() => {
    if (postInfo.likes.includes(loginUser)) {
      setIsLike(true);
    }
    const getComment = () => {
      axios
        .get(
          `http://localhost:5000/api/comments/post/${postId}`
        )
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
  

  // console.log("commentlv2", comment.comment.commentLv2);

  //Like bai viet

  const addLike = () => {
    axios
      .post(`http://localhost:5000/api/posts/like/${postId}`, {
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        alert("đã like");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const [cmtV1, setCmtV1] = useState("");

  const writeCommentV1 = () => {
    axios
      .post("http://localhost:5000/api/comments/commentlv1/", {
        postId: postId,
        message: cmtV1,
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
                return <CommentV1 key={comment._id} commentV1={{comment}}/>;
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
            <div className="post-comment-bar-btn" onClick={() => {writeCommentV1();}}>
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
