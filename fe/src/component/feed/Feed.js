import React, { useEffect, useState } from "react";
import "./feed.scss";
import Post from "../post/Post";
import axios from "axios";
function Feed() {
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getUserPost = () => {
      axios
        .get(`http://localhost:5000/api/posts/timeline/${userId}`)
        .then((res) => {
          console.log(res.data);
          setUserPost(res.data.posts[res.data.posts.length - 1]);
          console.log(userPost);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
  }, []);
  return (
    <div className="newfeed">
      {userPost.map((post) => {
        return <Post postInfo={post} />;
      })}
    </div>
  );
}

export default Feed;
