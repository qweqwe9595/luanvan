import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/Nav";
import { RiMessengerLine } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import "./SearchResults.scss";
const SearchResults = () => {
    return (
        <div>
        <Nav></Nav>    
        <div className="Search-Results">
          <div className="Filters">
              <p>kết quả tìm kiếm</p>
                <div className="items">
                   <span>Tất cả</span>
                </div>
                <div className="items">
                    <span>Bài viết</span>
                </div>
                <div className="items">
                    <span>Mọi người</span>
                </div>
                <div className="items">
                    <span>Trang</span>
                </div>
                <div className="items">
                    <span>Thông tin việc làm</span>
                </div> 
            </div>
            <div className="Results">
                <div className="Peoples">
                    <p>Mọi người</p>
                    <div className="People_tag">
                        <div className="img-info">
                            <img src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-nen-iMac-dep.jpg" className="avt"></img>
                            <div className="people_info">
                                <p>Nguyễn Văn A</p>
                                <span>Bạn bè</span>
                                <span>700 người theo dõi</span>
                                <span>Kỹ thuật phần mềm</span>     
                            </div>
                        </div>
                        
                        <div className="icon">
                            <RiMessengerLine></RiMessengerLine>
                        </div>
                      
                    </div>

                    <div className="People_tag">
                        <div className="img-info">
                            <img src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-nen-iMac-dep.jpg" className="avt"></img>
                            <div className="people_info">
                                <p>Nguyễn Văn ANH</p>
                                <span></span>
                                <span>700 người theo dõi</span>
                                <span>Kỹ thuật phần mềm</span>     
                            </div>
                        </div>
                        
                        <div className="icon">
                            <HiUserAdd/>
                        </div>
                    </div> 
                    
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
};

export default SearchResults;