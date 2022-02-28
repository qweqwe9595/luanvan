import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/DropdownButton';
import './post.scss';
import {FaHeart, FaComments, FaShare} from "react-icons/fa";



function Post(){
    return (
        <div className="newfeed">
        <div className="newfeed-post">
          <div className="newfeed-post-meta">
            <div className="newfeed-post-meta-avatar">
                <img src="https://dep365.com/wp-content/uploads/2021/07/Post-from-imjanedeleon-rsgym6-800x470.jpg"></img>
            </div>
            <div className="newfeed-post-meta-username">
                <p>Username</p>
            </div>
            <div className="newfeed-post-meta-timepost">
                <p> đã đăng Timepost</p>
            </div>
          </div>  
          <div className="newfeed-post-options">              
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="#/action-1">Chỉnh sửa</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Xóa</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Báo cáo</Dropdown.Item>
            </DropdownButton>
            </div>
            <br></br>
          <div className="newfeed-post-text">
            <p>Write something....</p>
          </div>
          <div className="newfeed-post-img">
            <img src="https://media.moitruongvadothi.vn/images/2022/02/21/9860-1645409694-dai-hoc-can-tho.jpg"></img>
          </div>
          <div className="newfeed-post-interaction">
                <h3><FaHeart></FaHeart> (100)</h3>
                <h3><FaComments></FaComments> (100)</h3> 
                <h3><FaShare></FaShare> (100)</h3>
          </div>
          <div className="newfeed-post-comment-list">
            <p>Các bình luận trước đó</p>
            <div className="newfeed-post-comment-list-item">  
                          
            </div>
            <div className="newfeed-post-comment-bar">
                <div className="newfeed-post-comment-bar-text">
                <input type="text" placeholder="Viết bình luận của bạn..."></input>
                </div>
                <div className="newfeed-post-comment-bar-btn">
                    <span>POST!</span>
                </div>
            </div>
          </div>
          
          <br></br>

        </div>
    </div>
    );
}
export default Post;
