import { FaBars, FaSearch } from "react-icons/fa";
import { AiOutlineBell, AiFillCaretDown } from "react-icons/ai";
import "./nav.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchResultContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

function Nav() {
  let navigate = useNavigate();
  const [searchResult, setSearchResult] = useContext(SearchResultContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({});

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

      <div className="searchbar">
        <div className="search-icon-container">
          <FaSearch className="search-icon"></FaSearch>
        </div>
        <input
          type="text"
          placeholder="Searching..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button type="submit" onClick={() => getSearchTerm()}>
          Search
        </button>
      </div>
      <div className="nav-right">
        <AiOutlineBell className="bell"></AiOutlineBell>
        <FaBars className="hamburger"></FaBars>
        <div className="user-container">
          <img
            src="https://static.tintuc.com.vn/images/ver3/2020/05/29/1590744919032-1590743807939-photo-1-15477129204692130819676.jpg"
            alt=""
          />
          <span>{userInfo.userName ? userInfo.userName : ""}</span>
          <AiFillCaretDown className="arrow-down" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
