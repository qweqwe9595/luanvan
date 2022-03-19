
import "./Home.scss";
import Nav from "../../component/nav/Nav";
import Feed from "../../component/feed/Feed";
import Share from "../../component/share/Share";
import Contacts from "../../component/contacts/Contacts";
import FriendRequest from "../../component/friendRequest/FriendRequest";
import Options from "../../component/options/Options";
import RecommendPage from "../../component/recommendPage/RecommendPage";
import React, {  useEffect, useState } from "react";
import axios from "axios";
function Home() {
  return (
    <div className="home">
      <Nav></Nav>
      <div className="home-maincontainer">
        <div className="leftbar">
          <Options></Options>
        </div>

        <div className="center">
          <Share></Share>
          <Feed userPost={[]}></Feed>
          <RecommendPage></RecommendPage>
        </div>
        <div className="rightbar">
          <FriendRequest></FriendRequest>
          <Contacts></Contacts>
        </div>
      </div>
    </div>
  );
}

export default Home;
