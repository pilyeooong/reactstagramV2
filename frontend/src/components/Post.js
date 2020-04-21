import React from "react";
import "./Post.scss";


function Post({ post }) {
  return (
    <div className="post">
      <img src={post.photo} alt="" style={{ width : "680px"}}/>
      <div>{post.author.username}</div>
      <div>{post.caption}</div>
    </div>
  )
}

export default Post;