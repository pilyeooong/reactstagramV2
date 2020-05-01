import React, { useState, useEffect } from "react";
import { useAppContext } from "stores/store";
import { useAxios, axiosInstance } from "utils/api";
import Post from "./Post";
import { Alert, Button } from "antd";
import "./PostList.scss";

function PostList() {
  const [postList, setPostList] = useState([]);
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origPostList }, refetch] = useAxios({
    url: "posts",
    headers,
  });
  useEffect(() => {
    setPostList(origPostList);
  }, [origPostList]);
  
  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";
    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers
      });
      setPostList(prevList => {
        return prevList.map(currentPost =>
            currentPost === post ? { ...currentPost, is_like: isLike } : currentPost
          );
        })
    }
    catch(error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Button className="refresh__btn" type="primary" onClick={() => refetch()}>
        Reload
      </Button>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다 :-(" />
      )}
      {postList && postList.map((post) => <Post key={post.id} post={post} handleLike={handleLike} />)}
    </div>
  );
}
export default PostList;
