import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

function Share() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const [desc, setDesc] = useState("");

  const Post = (e) => {
    console.log(desc);
    e.preventDeafaut();
    // axios
    //   .post("http://localhost:5000/api/posts", {
    //     desc,
    //   })
    //   .then((res) => {
    //     console.log("Thanh cong", res.data);
    //   })
    //   .catch((err) => {
    //     console.log("Loi roi ", err);
    //   });
  };

  return (
    <>
      <div className="share" onClick={setModalIsOpenToTrue}>
        <img
          src="https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg"
          alt=""
        />
        <input type="text" placeholder="Viết gì đó..." readOnly />
        <div className="share-right">
          <FaPhotoVideo className="share-img"></FaPhotoVideo>
          <div className="share-btn">
            <FaRegPaperPlane />
            <span>POST!</span>
          </div>
        </div>
      </div>
      <div className="share-modal">
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "500px",
              height: "400px",
              position: "relative",
              border: "1px solid #000",
              borderRadius: "0.3rem",
            },
          }}
        >
          <div className="share-modal-post">
            <p>Tạo bài viết mới</p>
            <form>
              <textarea
                placeholder="Viết gì đó..."
                className="share-modal-post-desc"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
              <div>
                <button
                  className="share-modal-post-btn1"
                  onClick={setModalIsOpenToFalse}
                >
                  HỦY
                </button>
                <button
                  className="share-modal-post-btn2"
                  onClick={(e) => {
                    Post(e);
                  }}
                >
                  ĐĂNG
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Share;
