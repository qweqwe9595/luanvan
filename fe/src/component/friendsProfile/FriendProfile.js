import React, { useEffect } from "react";
import "./friendsprofile.scss";
import { Link } from "react-router-dom";

function FriendProfile({ userData }) {
  const newDummy = userData?.friends?.filter((item, index) => {
    return index < 9;
  });
  return (
    <div className="friendprofile">
      <h1>
        <Link to={"/friend"}>Bạn bè</Link>
      </h1>

      <div className="friendprofile-container">
        {newDummy?.map((item, i) => {
          return (
            <Link
              to={`/profile/${item._id}`}
              key={i}
              className="friendprofile-item"
            >
              <img
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt=""
              />
              <p>
                {item.userName.length > 17
                  ? item.userName.substring(0, 15) + "..."
                  : item.userName}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FriendProfile;
