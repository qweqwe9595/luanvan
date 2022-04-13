import React, {useState, useEffect} from "react";
import "./Document.scss";
import { BiSearch } from "react-icons/bi";
import Nav from "../../component/nav/Nav";
import axios from "axios";

function Docurmen() {
  

  return (
      <div className="document_container">
          <Nav></Nav>
          <div className="document_left">
              <span>bộ lọc</span>
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
                        <input placeholder="tìm kiếm" type="search"></input>
                      </div>
                  </div>
                  <button>Đăng tài liệu</button>
              </div>
              <div className="document_right_body">
                  <div className="document_tag">
                      <img src="https://images.tuyensinh247.com/picture/2018/0621/1.jpg" className="document_tag_cover"/>
                        <p>tên tài liệu</p>
                      <div className="author">
                          <b>Tác giả: </b>
                          <span>Nguyễn Văn A fewgfewjfwejf</span>
                      </div>    
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Docurmen