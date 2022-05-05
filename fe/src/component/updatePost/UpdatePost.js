import React, { useState, useEffect, useContext } from "react";
import "./updatePost.scss";
import { BsPenFill, BsImages, BsCloudArrowUpFill } from "react-icons/bs";
import axios from "axios";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";

function UpdatePost({ setOpenUpdate, post }) {
  const [defaultDesc, setDefaultDesc] = useState(post.desc);
  const [defaultFiledefaultDescef, setDefaultFiledefaultDescef] = useState(post.img);
  const [desc, setDesc] = useState(post.desc);
  const [fileRef, setFileRef] = useState(post.img);
  const [previewURL, setPreviewUrl] = useState("http://localhost:5000/images/" + post.img);
  const [showModal, setShowModal] = useState(true);
  const updatePosts = () => {
    var formData = new FormData();
    if (defaultFiledefaultDescef === fileRef && defaultDesc === desc) {
      alert("Phải cập nhật ảnh hoặc text.");
      return;
    }
    formData.append("desc", desc);
    formData.append("img", fileRef);
    axios
      .patch(`http://localhost:5000/api/posts/${post._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="update_post">
      <Modal className="update-modal" size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Chỉnh sửa bài viết
                </ModalHeader>
                <ModalBody>
                  <Textarea
                      className="modal-desc"
                      color="lightBlue"
                      size="lg"
                      outline={false}
                      placeholder="Nhập nội dung chỉnh sửa."
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                  />    
                  <br></br>
                  <input
                    id="file-upload"
                    type="file"
                    name="photo"
                    onChange={function (e) {  
                      if (e.target.files[0] !== fileRef) {
                        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                        setFileRef(e.target.files[0]);
                      }
                    }}
                  />     
                    {previewURL !== "http://localhost:5000/images/null" ? (
                        <img className="cover" src={previewURL} alt=""></img>
                      ) : (
                        // <BsImages></BsImages>
                        ""
                      )}         
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
                          updatePosts();
                          setShowModal(false); 
                        }}
                        ripple="light"
                    >
                        Gửi
                    </Button>
                </ModalFooter>
            </Modal>
      {/* <div className="title">Cập nhật bài viết</div>
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
        <div className="item_details-desc">
          <input
            type="text"
            placeholder="Nội dung cập nhật..."
            value={desc}
            onChange={(e) => {
                setDesc(e.target.value);
            }}
          ></input>
        </div>
        <div className="item_details-img">
        <input
          id="file-upload"
          type="file"
          name="photo"
          onChange={function (e) {  
            if (e.target.files[0] !== fileRef) {
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
              setFileRef(e.target.files[0]);
            }
          }}
        />
        </div>
        <div className="pic_cover">
        {previewURL !== "http://localhost:5000/images/null" ? (
          <img className="cover" src={previewURL} alt=""></img>
        ) : (
          // <BsImages></BsImages>
          ""
        )}
        </div>
        <div className="button_update">
          <button
            onClick={() => {
              updatePosts();
              setOpenUpdate(false);
            }}
          >
            Cập nhật
          </button>
        </div>
      </div> */}
    </div>
  );
}
export default UpdatePost;
