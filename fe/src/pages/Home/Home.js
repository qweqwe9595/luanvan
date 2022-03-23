
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
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getUserPost = () => {
      axios
        .get(
          `http://localhost:5000/api/posts/timeline/${ userIdCurrent}`
        )
        .then((res) => {
          setUserPosts(res.data.posts);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
  }, []);
  console.log(userPosts);

  return (
    <div className="home">
      <Nav></Nav>
      <div className="home-maincontainer">
        <div className="leftbar">
          <Options></Options>
        </div>

        <div className="center">
          <Share></Share>
           <RecommendPage></RecommendPage>
          {userPosts.map((userPost, index) => {
            return (
              <Feed userPost={userPost} key={index}></Feed>
            )  
          })}
         
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
