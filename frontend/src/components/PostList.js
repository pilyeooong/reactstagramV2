import React, { useState, useEffect } from "react";
import { useAppContext } from "stores/store";
import { useAxios } from "utils/api";
import Post from "./Post";
import { Alert } from "antd";

function PostList() {
  const [postList, setPostList] = useState([]);
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origPostList }] = useAxios({
    url: "posts",
    headers,
  });
  useEffect(() => {
    setPostList(origPostList);
  }, [origPostList]);
    return (
      <div>
        {postList && postList.length === 0 && 
          <Alert type="warning" message="포스팅이 없습니다 :-(" />
        }
        {postList && postList.map(post => 
          <Post key={post.id} post={post} />
        )}
      </div>
    )
  }
  ;


export default PostList;
