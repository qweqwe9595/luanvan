import React from "react";
import { BiSearch } from "react-icons/bi";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Nav from "../../component/nav/Nav";
import "./Message.scss";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import MessTag from "../../component/messTag/MessTag";
import MessContent from "../../component/messContent/MessContent";
function Message() {
  const [user] = useContext(UserContext);
  const [myConversation, SetMyConversations] = useState("");
  const [conversations, SetConversations] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/conversations/getall?token=Bearer ${localStorage.getItem(
          "token"
        )}`,
        {}
      )
      .then((res) => {
        SetConversations(res.data);
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
          <div className="mess_tag">
            {user ? (
              <div>
                {conversations
                  ? conversations?.map((people, index) =>
                    people.members.includes(user?._id) ? (   
                      <div key={index} onClick={() => {
                        SetMyConversations(people);
                      }}>
                        <MessTag people={people} ></MessTag>    
                         </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mess_center">
          {myConversation ? (
            <MessContent myConversation = {myConversation}></MessContent>
          ): ""}
          
        </div>
      </div>
    </div>
  );
}

export default Message;
