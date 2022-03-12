import React, { useEffect, useState } from "react";
import "./feed.scss";
import Post from "../post/Post";
import axios from "axios";


function Feed() {
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getUserPost = () => {
      axios
        .get(`http://localhost:5000/api/posts/profile/${userId}?amount=10`)
        .then((res) => {
          setUserPost(res.data.posts);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
     getUserPost();
  }, []);

  console.log(userPost);
  
  return (
    <div className="newfeed">
      {userPost.map((post) => {
        return <Post key={post._id} postInfo={post} />;
      })}
    </div>
  );
}

export default Feed;
