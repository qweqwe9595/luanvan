import { FaBars, FaSearch } from "react-icons/fa";
import { AiOutlineBell, AiFillCaretDown } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import "./nav.scss";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { SearchResultContext } from "../../context/SearchContext";
import { useNavigate, Link } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [searchResult, setSearchResult] = useContext(SearchResultContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const currentUserId = localStorage.getItem("userID");

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users//getone/${userId}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  const getSearchTerm = () => {
    if (searchTerm === "") {
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/search?name=${searchTerm}`)
      .then((res) => {
        setSearchResult(res.data);
        navigate(`/searchresult`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="nav">
      <div className="nav-left">
        <img className="logo" src="./stocks/img/logo/ctu.png" alt="" />
        <div className="search-icon-container">
          <FaSearch className="search-icon"></FaSearch>
        </div>
      </div>

      <div
        onKeyPress={(e) => {
          if (e.key === "Enter") return getSearchTerm();
        }}
        className="searchbar"
      >
        <div className="search-icon-container">
          <FaSearch
            className="search-icon"
            onClick={() => {
              getSearchTerm();
            }}
          ></FaSearch>
        </div>
        <input
          type="text"
          placeholder="Searching..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="nav-right">
        <AiOutlineBell className="bell"></AiOutlineBell>
        <FaBars className="hamburger"></FaBars>

        <Link to={`/profile/${currentUserId}`}>
          <div className="user-container">
            <img
              src="https://static.tintuc.com.vn/images/ver3/2020/05/29/1590744919032-1590743807939-photo-1-15477129204692130819676.jpg"
              alt=""
            />
            <span>{userInfo.userName ? userInfo.userName : ""}</span>
          </div>
        </Link>
        <button onClick={() => {
            setOpen(!open);
          }}>
            <AiFillCaretDown  className="arrow-down"/>
          </button>
      </div>

      {open?(<div className="account">
        <div className="user">
          <img
            src="https://static.tintuc.com.vn/images/ver3/2020/05/29/1590744919032-1590743807939-photo-1-15477129204692130819676.jpg"
            alt=""
          />
          <div className="infouser">
            <span>{userInfo.userName ? userInfo.userName : ""}</span>
            <h4>Xem trang cá nhân của bạn </h4>
          </div>
         
        </div>
        <hr></hr>
        <div className="signout">
          <div className="icon-signout">
            <GoSignOut></GoSignOut>
          </div>
          <span>Đăng xuất</span></div>
        </div>):""}
       
    </div>
  );
}

export default Nav;
