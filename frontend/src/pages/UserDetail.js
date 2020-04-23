import React, { useState, useEffect } from "react";
import { useAxios, axiosInstance } from "utils/api";
import { useAppContext } from "stores/store";
import PageLayout from "components/PageLayout";
import UserInfo from "components/UserInfo";

function UserDetail({ match }) {
  console.log(match);
  const {
    params: { username },
  } = match;
  const {
    store: { jwtToken },
  } = useAppContext();

  const apiUrl = `${username}/posts/`;
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [postList, setPostList] = useState([]);

  const [{ data: origPostList }] = useAxios({
    url: apiUrl,
    headers,
  });


  useEffect(() => {
    setPostList(origPostList);
  }, [origPostList]);

  return (
    <PageLayout>
      <UserInfo username={username}/>
      {postList &&
        postList.map((post) => (
          <img
            src={post.photo}
            alt={post.caption}
            style={{ width: "300px", height: "300px" }}
          />
        ))}
    </PageLayout>
  );
}

export default UserDetail;
