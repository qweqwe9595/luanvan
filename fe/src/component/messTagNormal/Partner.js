import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Partner.scss";
import { BsThreeDots } from "react-icons/bs";
function Partner({ SetMyConversations, partners, people }) {
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(false);
  const [temp, setTemp] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/getone/${partners}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  //xóa hội thoại
  const deleteConver = () => {
    axios
      .delete(`http://localhost:5000/api/conversations/delete/${people?._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTemp(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      {temp ? (
        <div
          className="messTag"
          onMouseOver={() => {
            setOpen(true);
          }}
        >
          {userInfo?.photos?.avatar?.length === 0 ? (
            <img
              className="avt_mess_tag"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt=""
            />
          ) : (
            <img
              className="avt_mess_tag"
              src={`http://localhost:5000/images/${
                userInfo?.photos?.avatar[userInfo?.photos?.avatar?.length - 1]
              }`}
              alt=""
            />
          )}
          <span>{userInfo?.userName}</span>
          {open ? (
            <div
              className="option"
              onMouseOver={() => {
                setOpen(true);
              }}
              onMouseOut={() => {
                setOpen(false);
              }}
            >
              <div
                className="show"
                onClick={() => {
                  SetMyConversations(people);
                }}
              ></div>
              <BsThreeDots
                onClick={() => {
                  setOption(!option);
                }}
                className="icon_option"
              />
            </div>
          ) : (
            ""
          )}
          {option ? (
            <div className="option_item">
              <li
                onClick={() => {
                  deleteConver();
                }}
              >
                Xóa hội thoại
              </li>
              <li>Báo cáo</li>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Partner;
