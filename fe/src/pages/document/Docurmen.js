import React, { useState, useEffect } from "react";
import "./Document.scss";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import Nav from "../../component/nav/Nav";
import axios from "axios";
import { Link } from "react-router-dom";

function Docurmen() {
  const [alldocument, setAllDocument] = useState([]);
  useEffect(() => {
    axios
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
  }, []);
  console.log(alldocument);

  return (
    <div className="document_container">
      <Nav></Nav>
      <div className="document_left">
        <span>Bộ lọc</span>
        <hr></hr>
        <div className="document_tag">
          <span>Công nghệ thông tin</span>
        </div>
        <div className="document_tag">
          <span>Sư phạm</span>
        </div>
        <div className="document_tag">
          <span>Kinh tế</span>
        </div>
      </div>
      <div className="document_right">
        <div className="document_right_header">
          <div className="document_right_header_search">
            <div className="search">
              <BiSearch></BiSearch>
              <input placeholder="tìm kiếm tài liệu" type="search"></input>
            </div>
            <div className="document_filter">
              <FiFilter></FiFilter>
            </div>
          </div>

          <button>Đăng tài liệu</button>
        </div>
        <div className="document_right_body">
          {alldocument?.map((document, index) => {
            if (document.isApproved === false ) {
              return;
            }
            return (
              <div className="document_tag" key={index}>
                <img
                  src="https://images.tuyensinh247.com/picture/2018/0621/1.jpg"
                  className="document_tag_cover"
                />
                <p>
                   <Link to={`/docContent/${document._id}`}>
                  {document?.docName}
                </Link>     
                 </p>
                <div className="author">
                  <b>Tác giả:</b>
                    <span>{ document?.userId?.userName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Docurmen;
