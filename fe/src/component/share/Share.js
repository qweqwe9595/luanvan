import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import PostImgUpload from "../fileUpload/PostImgUpload";
import { Link } from "react-router-dom";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";

function Share({ setRefreshPosts }) {
  const userId = localStorage.getItem("userID");
  const [desc, setDesc] = useState("");
  const [scope, setScope] = useState("");
  const [img, setImg] = useState(false);
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);
  const [avt, setAvt] = useState([]);
  const [userinfos, setUserInfos] = useState("");
  const [showModal, setShowModal] = useState(false);

  const Share = () => {
    const userId = localStorage.getItem("userID");
    var formData = new FormData();
    if (!fileRef && !desc) {
      alert("Phải có ảnh hoặc text");
      return;
    }
    formData.append("img", fileRef);
    formData.append("userId", userId);
    formData.append("desc", desc);
    if(scope === "") formData.append("scope", "public")
    else formData.append("scope", scope);   

    axios
      .post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRefreshPosts((prev) => !prev);
        // window.location.reload(false);        
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userId}`)
        .then((res) => {
          setUserInfos(res.data);
          setAvt(res.data.photos.avatar.length);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  return (
    <div className="share">
       <Modal className="share-modal" size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Tạo bài viết mới
                </ModalHeader>
                <ModalBody>
                  <Textarea
                      className="modal-desc"
                      color="lightBlue"
                      size="lg"
                      outline={false}
                      placeholder="Hãy đăng gì đó nào."
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                  />
                  <br></br>
                  <input
                            type="file"
                            name="photo"
                            onChange={function (e) {
                              if (e.target.files[0]) {
                                setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                                setFileRef(e.target.files[0]);
                              }
                            }}
                          />
                  <select onChange={(e) => {
                        setScope(e.target.value);
                      }}>
                    <option value="public" active>Công khai</option>
                    <option value="friend">Bạn bè</option>
                    <option value="private">Riêng tư</option>
                  </select>                  
                    <div className="preview-container">
                      <img className="preview-img" src={previewURL} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Đóng
                    </Button>

                    <Button
                        color="green"
                        onClick={(e) => {
                          Share();
                          setDesc("");
                          setPreviewUrl(null);
                          setShowModal(false); 
                        }}
                        ripple="light"
                    >
                        Đăng
                    </Button>
                </ModalFooter>
            </Modal>
      <div className="share-top">
        <div className="share-left">
          <Link to={`/profile/${userId}`}>
            {avt === 0 ? (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                className="avatar"
              />
            ) : (
              <img
                src={`http://localhost:5000/images/${
                  userinfos?.photos?.avatar[
                    userinfos?.photos?.avatar?.length - 1
                  ]
                }`}
                className="avatar"
              />
            )}
          </Link>

          <div className="share-left-content">
            <input
              type="text"
              placeholder="Hôm nay bạn thế nào?"
              value={desc}
              // onChange={(e) => {
              //   setDesc(e.target.value);
              // }}
              onClick={(e) => setShowModal(true)}
            />
          </div>
        </div>

        <div className="share-right">
          <FaPhotoVideo className="share-img" onClick={() => setShowModal(true)} />
          <div
            className="share-btn"
            onClick={() => {
              setShowModal(true);  
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
    </div>
  );
}

export default Share;
