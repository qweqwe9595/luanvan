import React, { useState, useEffect } from "react";
import "./hero.scss";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import PhotoUpload from "../fileUpload/PhotoUpload";

function Hero() {
  const userId = useParams().userId;
  const userRequestId = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [userinfos, setUserInfos] = useState("");
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const [uploadBackground, setUploadBackground] = useState(false);
  console.log(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/events/all",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userId}`)
        .then((res) => {
          setUserInfos(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, [userId]);

  const addFriend = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${userId}`, {
        userId: userRequestId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  // console.log(userinfos);

  return (
    <div className="hero">
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
        {userRequestId === userId ? (
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
          <img
            className="avatar"
            src={`http://localhost:5000/images/${
              userinfos?.photos?.avatar[userinfos?.photos?.avatar?.length - 1]
            }`}
            alt=""
          />
          {userRequestId === userId ? (
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
        <div>Nhắn tin</div>
        {!userId.includes(userRequestId) ? (
          <div className="icon-request">
            <div onClick={() => addFriend()}>Kết bạn</div>
          </div>
        ) : (
          ""
        )}
        <div>Dự phòng</div>
      </div>
    </div>
  );
}

export default Hero;
