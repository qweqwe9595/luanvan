import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/Nav";
import "./DocContent.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
function DocContent() {
  const param = useParams();
  const [doc, setDoc] = useState([]);
  console.log(param);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/documents/getone/${param.id}`)
      .then((res) => {
        setDoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(doc);

  return (
    <div className="docTag">
      <Nav></Nav>
      <div className="docTag_title">
        <div className="doc_header">
          <div className="doc_header_left">
            <p>{}</p>
            <span>thời gian</span>
          </div>
          <div className="button">
            <button className="save_doc">Lưu</button>
            <button className="down_doc">Tải xuống</button>
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
          src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
          title="description"
          className="doc_content"
        ></iframe>
      </div>
      <div className="doc_footer">
        <p>Nội dung tài liệu</p>
        <span>{doc?.desc}</span>
      </div>
    </div>
  );
}

export default DocContent;
