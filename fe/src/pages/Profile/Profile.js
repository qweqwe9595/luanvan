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
  const [userPosts, setUserPost] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserPost = () => {
      axios
        .get(
          `http://localhost:5000/api/posts/timeline/${param.userId}?amount=10`
        )
        .then((res) => {
          // console.log(res.data);
          setUserPost(res.data.posts);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
    const getUser = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${param.userId}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUser();
  }, [param.userId]);
  //console.log(userPosts);
  return (
    <div className="profile">
      <Nav></Nav>
      <Hero></Hero>
      <div className="profile-main">
        <div className="profile-left">
          <Infos></Infos>
          <FriendProfile userData={userData} />
        </div>
        <div className="profile-right">
          <Share />
          {userPosts?.map((userPost, index) => {
            return <Feed userPost={userPost} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
