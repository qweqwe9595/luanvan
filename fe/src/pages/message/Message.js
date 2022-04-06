import React from "react";
import { BiSearch } from "react-icons/bi";
import { RiEditBoxLine } from "react-icons/ri";
import { MdSend } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Nav from "../../component/nav/Nav";
import "./Message.scss";
import { useEffect, useState } from "react";
import axios from "axios";
function Message() {
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/conversations/getall?token=Bearer ${localStorage.getItem(
          "token"
        )}`,
        {}
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className="message_container">
      <Nav></Nav>
      <div className="message_box_content">
        <div className="mess_left">
          <div className="mess_left_header">
            <div className="mess_left_search">
              <BiSearch></BiSearch>
              <input placeholder="Tìm kiếm hội thoại" type="search"></input>
            </div>
            <div className="icon_mess_left">
              <RiEditBoxLine />
            </div>
            <div className="icon_mess_left">
              <AiOutlineUsergroupAdd />
            </div>
          </div>
          <div className="mess_tag"></div>
        </div>

        <div className="mess_center">
          <div className="mess_cent_header">
            <div className="mess_info">
              <img
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2021/07/cute-astronaut-wallpaperize-amoled-clean-scaled.jpg"
                className="mess_cent_avt"
              ></img>
              <span>Nguyễn Văn An</span>
            </div>
            <div className="mess_cent_search">
              <BiSearch></BiSearch>
            </div>
            <div className="mess_cent_setting">
              <BsThreeDots></BsThreeDots>
            </div>
          </div>
          <div className="mess_content"></div>
          <div className="mess_fill">
            <div className="fill">
              <img className="mess_avt" src=""></img>
              <input type="text" placeholder="Nhắn tin"></input>
              <div className="send_message">
                <MdSend></MdSend>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
