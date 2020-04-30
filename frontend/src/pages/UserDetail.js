import React, { useState, useEffect } from "react";
import { useAxios } from "utils/api";
import { useAppContext } from "stores/store";
import PageLayout from "components/PageLayout";
import UserInfo from "components/UserInfo";
import "components/UserDetail.scss";

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

  const [userInfo, setUserInfo] = useState([]);
  const [{ data: origUserInfo }] = useAxios({
    url: `/accounts/profile/${username}/`,
    headers,
  });

  useEffect(() => {
    setUserInfo(origUserInfo);
  }, [origUserInfo]);

  useEffect(() => {
    setPostList(origPostList);
  }, [origPostList]);

  return (
    <PageLayout>
      {userInfo && <UserInfo userInfo={userInfo} />}
      <div className="user__posts">
        {postList &&
          postList.map((post) => (
            <img
              src={post.photo}
              alt={post.caption}
              style={{ width: "300px", height: "300px" }}
            />
          ))}
      </div>
    </PageLayout>
  );
}

export default UserDetail;
