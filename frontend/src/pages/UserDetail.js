import React, { useState, useEffect } from "react";
import { useAxios } from "utils/api";
import { useAppContext } from "stores/store";
import PageLayout from "components/Layout/PageLayout";
import UserInfo from "components/User/UserInfo";
import "components/User/UserDetail.scss";
import Posting from "components/User/Posting";

function UserDetail({ match }) {
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
        {postList && userInfo &&
          postList.map((post)=> (
            <Posting post={post} userInfo={userInfo}key={post.id} />
          ))}
      </div>
      
    </PageLayout>
  );
}

export default UserDetail;
