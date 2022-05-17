import React, { useState, useEffect } from "react";
import "./hero.scss";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PhotoUpload from "../fileUpload/PhotoUpload";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";

function Hero() {
  const userId = useParams().userId;
  const loginUser = localStorage.getItem("userID");
  const [userinfos, setUserInfos] = useState({});
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const [uploadBackground, setUploadBackground] = useState(false);
  const [avt, setAvt] = useState([]);
  const [showModalReports, setShowModalReports] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userId}`)
        .then((res) => {
          setUserInfos(res.data);
          setAvt(res.data.photos.avatar.length);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    };
    getUserInfo();
  }, [userId]);

  const addFriend = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${userId}`, {
        userId: loginUser,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const sendReports = () => {
    console.log(reports, "/profile/" + userId);
    axios
      .post(`http://localhost:5000/api/reports/createone`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data:{
          message: reports,
          link: "/profile/" + userId,
        },
      }
    )
    .then((res) => {
      console.log("repost thanh cong");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  }


  return (
    <div className="hero">
       <Modal size="sm" active={showModalReports} toggler={() => setShowModalReports(false)}>
                <ModalHeader toggler={() => setShowModalReports(false)}>
                    Báo cáo người dùng
                </ModalHeader>
                <ModalBody>
                  <Textarea
                      className="modal-desc"
                      color="lightBlue"
                      size="lg"
                      outline={false}
                      placeholder="Nhập nội dung phản ánh."
                      value={reports}
                      onChange={(e) => {
                        setReports(e.target.value);
                      }}
                  />                  
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModalReports(false)}
                        ripple="dark"
                    >
                        Đóng
                    </Button>

                    <Button
                        color="blue"
                        onClick={(e) => {
                          sendReports();
                          setReports("");
                          setShowModalReports(false); 
                        }}
                        ripple="light"
                    >
                        Gửi
                    </Button>
                </ModalFooter>
            </Modal>
      {uploadAvatar && <PhotoUpload open={setUploadAvatar} type={"avatar"} />}
      {uploadBackground && (
        <PhotoUpload open={setUploadBackground} type={"background"} />
      )}
      <div className="coverpicture-container">
        <img
          className="coverpicture"
          src={`http://localhost:5000/images/${
            userinfos?.photos?.background[
              userinfos?.photos?.background?.length - 1
            ]
          }`}
          alt=""
        />
        {loginUser === userId ? (
          <AiOutlineCamera
            className="camera-background"
            onClick={() => setUploadBackground(true)}
          />
        ) : (
          ""
        )}
      </div>
      <div className="hero-profile">
        <div className="avatar-container">
          {avt === 0 ? (
            <img
              className="avatar"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt=""
            />
          ) : (
            <img
              className="avatar"
              src={`http://localhost:5000/images/${
                userinfos?.photos?.avatar[userinfos?.photos?.avatar?.length - 1]
              }`}
              alt=""
            />
          )}

          {loginUser === userId ? (
            <AiOutlineCamera
              className="camera"
              onClick={() => setUploadAvatar(true)}
            />
          ) : (
            ""
          )}          
        </div>
        <p className="hero-name">
          {userinfos.userName ? userinfos.userName : ""}          
        </p>
              
      </div>
      <div className="hero-content">
        <Link to={"/message"}>
          <div className="message">Nhắn tin</div>
        </Link>
        {userId !== loginUser &&
        !userinfos?.friends?.filter((item) => item._id == loginUser).length ? (
          <div className="icon-request">
            <div onClick={() => addFriend()}>Kết bạn</div>
          </div>
        ) : (
          " "
        )}
        <div onClick={() => {            
                setShowModalReports(!showModalReports);
              }}
              >Báo cáo</div>
      </div>
    </div>
  );
}

export default Hero;
