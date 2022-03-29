import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";
import { useState } from "react";
import axios from "axios";
import PostImgUpload from "../fileUpload/PostImgUpload";

function Share() {
  const userId = localStorage.getItem("userID");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(false);
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);

  const Share = () => {
    const userId = localStorage.getItem("userID");
    var formData = new FormData();
    formData.append("img", fileRef);
    formData.append("userId", userId);
    formData.append("desc", desc);
    axios
      .post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Đăng bài viết mới thành công.");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  return (
    <div className="share">
      <div className="share-top">        
        <div className="share-left">
          <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"/>
          <div className="share-left-content">
            <input
              type="text"
              placeholder="Bạn muốn chia sẻ gì không?"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />         
          </div>
        </div>

        <div className="share-right">
          <FaPhotoVideo className="share-img" onClick={() => setImg(true)} />
          <div
            className="share-btn"
            onClick={() => {
              Share();
            }}
          >
            <FaRegPaperPlane />
            <span>ĐĂNG!</span>
          </div>
        </div>
      </div>
      <div className="share-middle">
        {img && (
          <PostImgUpload
            preview={[previewURL, setPreviewUrl]}
            setFileRef={setFileRef}
            open={setImg}
          />
        )}
        </div>
      <div className="share-bottom">
      {previewURL && (
        <div className="preview-container">
          <img className="preview-img" src={previewURL} alt="" />
        </div>
      )}
      </div>
    </div>
  );
}

export default Share;
