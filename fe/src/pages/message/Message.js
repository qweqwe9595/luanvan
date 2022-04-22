import React from "react";
import { BiSearch } from "react-icons/bi";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Nav from "../../component/nav/Nav";
import "./Message.scss";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
// import { SocketContext } from "../../context/SocketContext";
import MessContent from "../../component/messContent/MessContent";
import CreateConversation from "../../component/createConversation/CreateConversation";
import SettingConversation from "../../component/messContent/settingConversation/SettingConversation";
import CreateGroupt from "../../component/createConversation/CreateGroupt";
import MessTagGroup from "../../component/messTagGroup/MessTagGroup";
import Partner from "../../component/messTagNormal/Partner";

function Message() {
  const [user] = useContext(UserContext);
  const [myConversation, SetMyConversations] = useState("");
  const [conversations, SetConversations] = useState("");
  const [openNewConver, setOpenNewConver] = useState(false);
  const [loadAll, setLoadAll] = useState(false);
  const [addGroupt, setAddGroupt] = useState(false);

  // let member = [user?._id];
  // console.log(member);
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
  }, [openNewConver, loadAll, addGroupt]);
  return (
    <div className="message_container">
      <Nav></Nav>
      {openNewConver ? (
        <div>
          <div
            className="create_new_groupt"
            onClick={() => setOpenNewConver(false)}
          ></div>
          <CreateConversation
            setOpenNewConver={setOpenNewConver}
            SetMyConversations={SetMyConversations}
          ></CreateConversation>
        </div>
      ) : (
        ""
      )}
      {addGroupt ? (
        <div>
          <div
            className="create_new_groupt"
            onClick={() => setAddGroupt(false)}
          ></div>
          <CreateGroupt
            setAddGroupt={setAddGroupt}
            SetMyConversations={SetMyConversations}
          ></CreateGroupt>
        </div>
      ) : (
        ""
      )}

      {loadAll ? (
        <SettingConversation
          myConversation={myConversation}
        ></SettingConversation>
      ) : (
        ""
      )}
      <div className="message_box_content">
        <div className="mess_left">
          <div className="mess_left_header">
            <div className="mess_left_search">
              <BiSearch></BiSearch>
              <input placeholder="Tìm kiếm hội thoại" type="search"></input>
            </div>
            <div
              className="icon_mess_left"
              onClick={() => setOpenNewConver(!openNewConver)}
            >
              <RiEditBoxLine />
            </div>
            <div
              className="icon_mess_left"
              onClick={() => {
                setAddGroupt(!addGroupt);
              }}
            >
              <AiOutlineUsergroupAdd />
            </div>
          </div>
          <div className="mess_tag">
            {user ? (
              <div>
                {conversations
                  ? conversations?.map((people, index) =>
                      people.members.includes(user?._id) ? (
                        <div
                          key={index}
                          onClick={() => {
                            setLoadAll(false);
                          }}
                        >
                          {people?.members?.length > 2 ? (
                            <MessTagGroup
                              people={people}
                              SetMyConversations={SetMyConversations}
                            ></MessTagGroup>
                          ) : (
                            <>
                              {people?.members?.map((partners, index) =>
                                partners === user?._id ? (
                                  ""
                                ) : (
                                  <div
                                    key={index}>
                                    <Partner
                                      partners={partners}
                                        SetMyConversations={SetMyConversations}
                                        people = {people}
                                    ></Partner>
                                  </div>
                                )
                              )}
                            </>
                          )}
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
            <MessContent
              myConversation={myConversation}
              setLoadAll={setLoadAll}
              loadAll={loadAll}
            ></MessContent>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
