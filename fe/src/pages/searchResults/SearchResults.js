import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/Nav";
import {
  RiMessengerLine,
  RiPagesLine,
  RiCalendarEventLine,
} from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { ImNewspaper } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import "./SearchResults.scss";
//import axios from "axios";

function SearchResults() {
    const [SearchResult, setSearchResult] = useState([]);
    const userId = localStorage.getItem("userID");

  return (
    <div>
      <Nav Search={[SearchResult, setSearchResult]}></Nav>
      <div className="Search-Results">
        <div className="Filters">
          <p>Kết quả tìm kiếm</p>
          <span>Bộ lọc</span>
          <div className="items">
            <div className="icon">
              <ImNewspaper />
            </div>
            <span>Tất cả</span>
          </div>
          <div className="items">
            <div className="icon">
              <BiNews />
            </div>
            <span>Bài viết</span>
          </div>
          <div className="items">
            <div className="icon">
              <FaUsers />
            </div>
            <span>Mọi người</span>
          </div>
          <div className="items">
            <div className="icon">
              <RiPagesLine />
            </div>
            <span>Trang</span>
          </div>
          <div className="items">
            <div className="icon">
              <RiCalendarEventLine />
            </div>
            <span>Tuyển dụng</span>
          </div>
              </div>
        
        <div className="Results">
          <div className="Peoples">
            <p>Mọi người</p>
            {SearchResult?.data?.map((people) => {
              return (
                <div className="People_tag">
                  <div className="img-info">
                    <img
                      src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-nen-iMac-dep.jpg"
                      className="avt"
                    ></img>
                    <div className="people_info">
                      <p>{people.userName}</p>
                      <span>bạn bè</span>
                      <span>{people.friends? people.friends.length:"0 người theo dõi"} người theo dõi</span>
                      <span>{people.major ? people.major.majorName : ""}</span>
                    </div>
                  </div>

                  <div className="icon">
                    <RiMessengerLine></RiMessengerLine>
                  </div>
                </div>
              );
            })}

            <button>Xem tất cả</button>
          </div>
          <div className="Post">
            <p>Bài viết</p>
            <button>Xem tất cả</button>
          </div>
          <div className="Page">
            <p>Trang</p>
            <button>Xem tất cả</button>
          </div>
          <div className="Event">
            <p>Thông tin việc làm</p>
            <button>Xem tất cả</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
