
import { FaBars, FaSearch } from "react-icons/fa";
import { AiOutlineBell, AiFillCaretDown } from "react-icons/ai";
import "./nav.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
function Nav() {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getSearchTerm = () => {
      axios
        .get(`http://localhost:5000/api/users/search`)
        .then((res) => {
          setSearchTerm( res.data );
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getSearchTerm();
  }, []);
  
  console.log(searchTerm);

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
        <input type="text" placeholder="Searching..."
          onChange={event => {
            setSearchTerm(event.target.value);
          }} />
      </div>
      <div className="nav-right">
        <AiOutlineBell className="bell"></AiOutlineBell>
        <FaBars className="hamburger"></FaBars>
        <div className="user-container">
          <img
            src="https://static.tintuc.com.vn/images/ver3/2020/05/29/1590744919032-1590743807939-photo-1-15477129204692130819676.jpg"
            alt=""
          />
          <span>name</span>
          <AiFillCaretDown className="arrow-down" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
