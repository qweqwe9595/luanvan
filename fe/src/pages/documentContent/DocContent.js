import React, { useContext, useEffect, useState } from "react";
import Nav from "../../component/nav/Nav";
import "./DocContent.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
function DocContent() {
  const param = useParams();
  const [doc, setDoc] = useState([]);
  const [user] = useContext(UserContext);
  const [save, setSave] = useState(
    user?.saveDocs?.some((item) => item === param?.id)
  );
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/documents/getone/${param.id}`)
      .then((res) => {
        setDoc(res.data);
        setSave(user?.saveDocs?.some((item) => item === param?.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const saveDoc = (docId) => {
    axios
      .patch(
        `http://localhost:5000/api/users/savedoc`,
        {
          docId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setSave(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="docTag">
      <Nav></Nav>
      <div className="docContent">
        <div className="docTag_title">
          <div className="doc_header">
            <div className="doc_header_left">
              <p>{doc?.docName}</p>
              <div className="button">
              {user ? (
                <>
                  {save ? (
                    <button className="save_doc">Đã lưu</button>
                  ) : (
                    <button
                      onClick={() => {
                        saveDoc(doc?._id);
                      }}
                      className="save_doc"
                    >
                      Lưu
                    </button>
                  )}
                </>
              ) : (
                ""
              )}
              <button className="down_doc">Tải xuống</button>
            </div>
          </div>            
        </div>
          <div className="doc_author">
            {doc?.userId?.photos?.avatar?.length === 0 ? (
              <img
                className="avt_friend_request"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              />
            ) : (
              <img
                src={`http://localhost:5000/images/${
                  doc?.userId?.photos?.avatar[
                    doc.userId?.photos?.avatar?.length - 1
                  ]
                }`}
              ></img>
            )}
            <span>{doc?.userId?.userName}</span>
          </div>
          <iframe
            src={`http://localhost:5000/images/${
                  doc?.userId?.photos?.file
                }`}
            title="description"
            className="doc_content"
          ></iframe>
        </div>
        <div className="doc_footer">
          <p>Nội dung tài liệu</p>
          <span>{doc?.desc}</span>
        </div>
      </div>
    </div>
  );
}

export default DocContent;
