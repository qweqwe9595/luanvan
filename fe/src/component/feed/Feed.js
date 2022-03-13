import React from "react";
import "./feed.scss";
import Post from "../post/Post";

function Feed({ userPost }) {
  return (
    <div className="newfeed">
      {userPost.map((post) => {
        return <Post key={post._id} postInfo={post} />;
      })}
    </div>
  );
}

export default Feed;
