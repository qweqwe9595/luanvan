import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.scss";
import Nav from "../../component/nav/Nav";
import Hero from "../../component/Hero/Hero";
import Infos from "../../component/infos/Infos";
import FriendProfile from "../../component/friendsProfile/FriendProfile";
import Share from "../../component/share/Share";
import Feed from "../../component/feed/Feed";
import { useParams } from "react-router-dom";

function Profile() {
  const param = useParams();
  console.log(param.userId);
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    const getUserPost = () => {
      axios
        .get(
          `http://localhost:5000/api/posts/profile/${param.userId}?amount=10`
        )
        .then((res) => {
          console.log(res.data);
          setUserPost(res.data.posts);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
  }, []);
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
          <Feed userPost={userPost} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
