import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ModelNewDoc.scss";
import { Link } from "react-router-dom";

function ModelNewDoc({ setModelApprove }) {
  const [alldocument, setAllDocument] = useState([]);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/documents/getall?token=Bearer ${localStorage.getItem(
          "token"
        )}`
      )
      .then((res) => {
        setAllDocument(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const sentApprose = (Doc_id) => {
    axios
      .patch(
        `http://localhost:5000/api/documents/approveone/${Doc_id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("đã duyệt thành công");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sentUnApprose = (Doc_id) => {
    axios
      .patch(
        `http://localhost:5000/api/documents/unapproveone/${Doc_id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("đã từ chối");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div
        className="model_new_show"
        onClick={() => {
          setModelApprove(false);
        }}
      ></div>
      <div className="model_new_doc">
        <div className="model_new_doc_header">
          <span>Danh sách tài liệu</span>
          <button
            onClick={() => {
              setModelApprove(false);
            }}
          >
            X
          </button>
        </div>
        {alldocument?.map((document, index) => {
          if (document.isApproved === true) {
            return;
          }
          return (
            <div className="document_tag" key={index}>
              <img
                src={`http://localhost:5000/images/${document?.img}`}
                className="document_tag_cover"
              />
              <p>
                <Link to={`/docContent/${document._id}`}>
                  {document?.docName}
                </Link>
              </p>
              <div className="author">
                <b>Tác giả:</b>
                <span>{document?.userId?.userName}</span>
              </div>
              <div className="button_approve_unapprove">
                <button
                  className="approve"
                  onClick={() => {
                    sentApprose(document?._id);
                  }}
                >
                  Duyệt
                </button>
                <button
                  className="unapprove"
                  onClick={() => {
                    sentUnApprose(document?._id);
                  }}
                >
                  Từ chuối
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ModelNewDoc;
