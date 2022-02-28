import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";
import {useState} from "react";
import axios from "axios";

function Share() {
       const [desc, setDesc] = useState("");
  
    const Share = () => {
      axios
      .post("http://localhost:5000/api/posts", {
        desc,
      })
      .then((res) => {
        console.log("Thanh cong", res.data);  
      })
      .catch((err) => {
        console.log("Loi roi ", err);
      });
    };

  return (
    <div className="share" >
      <img
        src="https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg"
        alt=""
      />
      <input type="text" placeholder="Viết gì đó..." value={desc} onChange={(e) => {setDesc(e.target.value); }}/>
      <div className="share-right">
        <FaPhotoVideo className="share-img"></FaPhotoVideo>
        <div className="share-btn" onClick={() => {Share();}}>
          <FaRegPaperPlane />
          <span>POST!</span>
        </div>
      </div>
    </div>    
  );
}

export default Share;
