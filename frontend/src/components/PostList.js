import React from "react";
import axios from "axios";

function PostList() {
  const getPostList = async () => {
    const response = await axios.get("http://localhost:8000/posts")
    console.log(response);
  }
  getPostList();
  return (
    <h1>123</h1>
  )
}

export default PostList;