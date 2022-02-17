import React from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import "./nav.scss";

function Nav() {
  return (
    <div className="nav">
      <img
        className="logo"
        src="https://sp-ao.shortpixel.ai/client/q_glossy,ret_img/https://lambanner.com/wp-content/uploads/2020/04/MNT-DESIGN-10-MEO-THIET-KE-LOGO-1130x570.jpg"
        alt=""
      />
      <FaBars className="hamburger"></FaBars>
      <div className="searchbar">
        <div className="search-icon-container">
          <FaSearch className="search-icon"></FaSearch>
        </div>
        <input type="text" placeholder="Searching..." />
      </div>
      <div className="nav-right">
        <FaBell className="bell"></FaBell>
        <img
          className="avatar-mobile"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Asd-web.jpg/441px-Asd-web.jpg"
          alt=""
        />
        <div className="user-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Asd-web.jpg/441px-Asd-web.jpg"
            alt=""
          />
          <span>name</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
