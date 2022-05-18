import React, { useState } from "react";
import "./MessTag.scss";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
function MessTagGroup({ people, SetMyConversations }) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(false);
  const [temp, setTemp] = useState(true);
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
      {people?.img?.length === 0 ? (
        <img
          className="avt_mess_tag"
          src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
          alt=""
        />
      ) : (
        <img
          className="avt_mess_tag"
          src={`http://localhost:5000/images/${people?.img}`}
          alt=""
        />
      )}
      <span>{people?.conversationName}</span>
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
                }}>Xóa hội thoại</li>
        </div>
      ) : (
        ""
      )}
    </div>
      ):""}
  
    </>
  
  );
}

export default MessTagGroup;
