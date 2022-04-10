import React, { useState, useEffect, useContext } from "react";
import "./updatePost.scss";
import { BsPenFill, BsImages, BsCloudArrowUpFill } from "react-icons/bs";
import axios from "axios";

function UpdatePost({ setOpenUpdate }, {postInfo}) {
  console.log(postInfo);
  const [desc, setDesc] = useState("");
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);

  const updatePosts = () => {
    var formData = new FormData();
    formData.append("desc", desc);
    formData.append("eventImg", fileRef);
    axios
      .post(`http://localhost:5000/api/posts/${postInfo._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("thành công ");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="update_post">
      <div className="title">Cập nhật bài viết</div>
      <div className="exit">
        <button
          onClick={() => {
            setOpenUpdate(false);
          }}
        >
          X
        </button>
      </div>     

      <div className="update_details">
        <div className="item_details">
          <input
            type="text"
            placeholder="Nội dung cập nhật..."
            value={desc}
            onChange={(e) => {
                setDesc(e.target.value);
            }}
          ></input>
          <BsPenFill></BsPenFill>
        </div>
        <div className="item_details">
        <input
          id="file-upload"
          type="file"
          name="photo"
          placeholder="Nội dung cập nhật..."
          onChange={function (e) {
            if (e.target.files[0]) {
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
              setFileRef(e.target.files[0]);
            }
          }}
        />
          <BsPenFill></BsPenFill>
        </div>
        <div className="pic_cover">
        {previewURL ? (
          <img className="cover" src={previewURL} alt=""></img>
        ) : (
          <BsImages></BsImages>
        )}
        </div>
        <div className="button_update">
          <button
            onClick={() => {
              updatePosts();
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
export default UpdatePost;
