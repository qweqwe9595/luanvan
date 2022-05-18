import React, { useState, useEffect, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import "./CreateGroupt.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";

function CreateGroupt({ setAddGroupt, SetMyConversations }) {
  const [user] = useContext(UserContext);
  const [number, setNumber] = useState([user]);
  const [numberID, setNumberID] = useState([user._id])
  const [name, setName] = useState("");
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);
  const [openImg, setOpenImg] = useState(false);

  const sendCreateGroupt = () => {
    if (name === "") {
      alert("tên nhóm không được để trống")
      return;
    }
    var formData = new FormData();
    formData.append("members", numberID);
    formData.append("conversationName", name);
    formData.append("img", fileRef);
    axios
      .post(`http://localhost:5000/api/conversations/createone`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((res) => {
         setAddGroupt(false);
        // SetMyConversations(res.data); 
         console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log(fileRef);
  return (
    <div className="Groupt_box">
      <div className="exit">
        <p>Tạo nhóm chat</p>
        <button
          onClick={() => {
            setAddGroupt(false);
          }}
        >
          X
        </button>
      </div>
      <div className="Groupt_info">
        <div className="image" onClick={() => setOpenImg(true)}>
          {previewURL ? (
            <img className="avt_groupt" src={previewURL} alt=""></img>
          ) : (
            <BsImage className="icons"></BsImage>
          )}
        </div>
        <input
          placeholder="Nhập tên nhóm"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className="search_friend">
        <span>Thêm thành viên vào nhóm</span>
        <div className="search">
          <BiSearch></BiSearch>
          <input placeholder="Nhập tên " type="search"></input>
        </div>
      </div>
      <div className="result">
        <p>Bạn bè của bạn</p>
      </div>
      <div className="friendss">
        <div className="my_friend">
          {user?.friends?.map((values, index) => {
            return (
              <div
                className="friend_values"
                key={index}
                onClick={() => {
                  setNumber((pre) => {
                    if (pre.includes(values) === true) {
                      return pre;
                    } else {
                      setNumberID((item) => {
                        if (item.includes(values._id) === true) {
                          return item;
                        } else {
                           return [...item, values._id];
                        }
                      });
                      return [...pre, values];
                      
                    }
                  });
                }
              }
              >
                {values?.photos?.avatar?.length === 0 ? (
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                ) : (
                  <img
                    src={`http://localhost:5000/images/${
                      values?.photos?.avatar[values?.photos?.avatar?.length - 1]
                    }`}
                  />
                )}

                <span>{values?.userName}</span>
              </div>
            );
          })}
        </div>

        <div className="choose_friend">
          <span>Đã chọn</span>
          <div className="choosed">
            {number.map((item, index) => (
              <div
                className="info_fr"
                key={index}
                onClick={() => {
                  if (item._id === user._id) return;
                  setNumber((prev) => {
                    const temp = prev.filter((p) => p._id !== item._id);
                    setNumberID((ite) => {
                      const testex = ite.filter((t) => t !== item._id);
                      return testex;
                    })
                    return temp;
                  });
                }}
              >
                {item?.photos?.avatar?.length === 0 ? (
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                ) : (
                  <img
                    src={`http://localhost:5000/images/${
                      item?.photos?.avatar[item?.photos?.avatar?.length - 1]
                    }`}
                  />
                )}
                <span>{item.userName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="button_create">
        <button onClick={() => sendCreateGroupt()}>Tạo nhóm</button>
      </div>
      {openImg ? (
        <div className="upload_image">
          <img className="img" src={previewURL}></img>
          <input
            id="file-upload"
            type="file"
            name="photo"
            onChange={function (e) {
              if (e.target.files[0]) {
                setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                setFileRef(e.target.files[0]);
              }
            }}
          />
          <div className="button">
            <button
              className="button_exit"
              onClick={() => {
                setOpenImg(false);
                setPreviewUrl(null);
                setFileRef(null);
              }}
            >
              Hủy
            </button>
            <button className="button_accept" onClick={() => setOpenImg(false)}>
              Chọn ảnh
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreateGroupt;
