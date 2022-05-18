import React, { useState, useEffect, useContext } from "react";
import "./Document.scss";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import Nav from "../../component/nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateNewDoc from "../../component/createNewDoc/CreateNewDoc";
import { UserContext } from "../../context/userContext";
import ModelNewDoc from "./modelNewDoc/ModelNewDoc";

function Docurmen() {
  const [user] = useContext(UserContext);
  const [openModelApprove, setModelApprove] = useState(false);
  const [alldocument, setAllDocument] = useState([]);
  const [openCreateDoc, setOpenCreateDoc] = useState(false);
  const [filter, setFilter] = useState("new");

  console.log(alldocument);
  useEffect(() => {}, [openCreateDoc, openModelApprove]);

  useEffect(async () => {
    switch (filter) {
      case "new": {
        return axios
          .get(
            `http://localhost:5000/api/documents/getall?token=Bearer ${localStorage.getItem(
              "token"
            )}`,
            {}
          )
          .then((res) => {
            setAllDocument(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
        break;
      }
      case "joined": {
        return axios
          .get("http://localhost:5000/api/documents/getuser", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setAllDocument(res.data);
          })
          .catch((err) => {});
        break;
      }
      default: {
        setAllDocument([]);
      }
    }
  }, [openCreateDoc, openModelApprove, filter]);
  return (
    <div className="document_container">
      <Nav></Nav>
      {/* tạo tài liệu mới */}
      {openCreateDoc ? (
        <CreateNewDoc
          alldocuments={alldocument}
          setOpenCreateDoc={setOpenCreateDoc}
        ></CreateNewDoc>
      ) : (
        ""
      )}
      {/* hiển thị tài liệu chưa được duyệt */}
      {openModelApprove ? (
        <ModelNewDoc setModelApprove={setModelApprove}></ModelNewDoc>
      ) : (
        ""
      )}

      <div className="document_left">
        <span>Bộ lọc</span>
        <hr></hr>
        {user?.isAdmin ? (
          <div
            className="document_tag"
            onClick={() => {
              setModelApprove(!openModelApprove);
            }}
          >
            <span>Tài liệu mới</span>
          </div>
        ) : (
          ""
        )}
        <div
          className="document_tag"
          onClick={() => {
            setFilter("new");
          }}
        >
          <span>Tất cả</span>
        </div>
        <div className="document_tag">
          <span
            onClick={() => {
              setFilter("joined");
            }}
          >
            Tài liệu của tôi
          </span>
        </div>
      </div>
      <div className="document_right">
        <div className="document_right_header">
          <div className="document_right_header_search">
            <div className="search">
              <BiSearch></BiSearch>
              <input placeholder="Nhập tên tài liệu..." type="search"></input>
            </div>
            <div className="document_filter">
              <FiFilter className="icon_filter"></FiFilter>
            </div>
          </div>
          <button
            className="button_create"
            onClick={() => {
              setOpenCreateDoc(!openCreateDoc);
            }}
          >
            Đăng tài liệu
          </button>
        </div>
        <div className="document_right_body">
          {alldocument?.map((document, index) => {
            if (document.isApproved === false) {
              return;
            }
            return (
              <div className="doc_tag" key={index}>
                <Link to={`/docContent/${document._id}`}>
                  <img
                    src={`http://localhost:5000/images/${document?.img}`}
                    className="document_tag_cover"
                  />
                  <p>{document?.docName}</p>
                  <div className="author">
                    <b>Tác giả:</b>
                    <span>{document?.userId?.userName}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Docurmen;
