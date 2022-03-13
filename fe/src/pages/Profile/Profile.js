import React from "react";
import "./profile.scss";
import Nav from "../../component/nav/Nav";
import Hero from "../../component/Hero/Hero";
import Infos from "../../component/infos/Infos";
import FriendProfile from "../../component/friendsProfile/FriendProfile";
import Share from "../../component/share/Share";
import Feed from "../../component/feed/Feed";

function Profile() {
  return (
    <div className="profile">
      {/* <Nav></Nav> */}
      <Hero></Hero>
      <div className="profile-main">
        <div className="profile-left">
          <Infos></Infos>
          <FriendProfile />
        </div>
        <div className="profile-right">
          <Share />
          <Feed />
        </div>
      </div>
    </div>
  );
}

export default Profile;
