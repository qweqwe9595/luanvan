import React, { useContext, useState } from "react";
import Nav from "../../component/nav/Nav";
import {
  RiPagesLine,
  RiCalendarEventLine,
  RiMessengerLine,
} from "react-icons/ri";
import "./SearchResults.scss";
import { SearchResultContext } from "../../context/SearchContext";
import SearchResultTag from "./button/btnSendRequest";
import { Link } from "react-router-dom";

function SearchResults() {
  const [searchResult, setSearchResult] = useContext(SearchResultContext);
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [resetSearch, setResetSearch] = useState(false);

  return (
    <div>
      <Nav></Nav>
      <div className="Search-Results">
        <div className="Results">
          <div className="Peoples">
            <p>Mọi người</p>
            {searchResult?.data?.map((people) => {
              return (
                <div className="People_tag" key={people._id}>
                  <div className="img-info">
                    {people?.photos?.avatar?.length !== 0 ? (
                      <img
                        src={`http://localhost:5000/images/${
                          people?.photos?.avatar[
                            people?.photos?.avatar?.length - 1
                          ]
                        }`}
                        className="avt"
                      ></img>
                    ) : (
                      <img
                        className="avt"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      />
                    )}

                    <div className="people_info">
                      <Link to={`/profile/${people._id}`} className="link">
                        <p>{people.userName}
                        {people.friends.includes(userIdCurrent) ? (
                        <span>--Bạn bè</span>
                        
                         ) : (
                        ""
                        )}
                        </p>
                       </Link>
                      
                     
                      <p>
                        {people.friends
                          ? people.friends.length
                          : "0 bạn bè"}{" "}
                        bạn bè
                      </p>
                      <p>Quê quán: {people.address ? people.address.city : ""}</p>
                    </div>
                  </div>
                  {people._id === userIdCurrent ? (
                    ""
                  ) : people.friends.includes(userIdCurrent) ? (
                    <button className="icon">
                      <RiMessengerLine></RiMessengerLine>
                    </button>
                  ) : people.friendsRequest.includes(userIdCurrent) ? (
                    // <button type="button" className="icon2">
                    //   <FaUserPlus />
                    // </button>
                    <p>Đã gửi lời mời kết bạn.</p>
                  ) : (
                    <SearchResultTag id={people._id} setResetSearch={setResetSearch}></SearchResultTag>
                  )}
                </div>
              );
            })}
            {/* <button>Xem tất cả</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
