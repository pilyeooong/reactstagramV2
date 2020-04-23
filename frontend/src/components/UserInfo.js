import React, { useState, useEffect } from "react";
import { useAppContext } from "stores/store";
import { useAxios } from "utils/api";

function UserInfo({ username }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [userInfo, setUserInfo] = useState([]);
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origUserInfo }] = useAxios({
    url: `/accounts/profile/${username}/`,
    headers,
  });

  useEffect(() => {
    setUserInfo(origUserInfo);
  }, [origUserInfo]);

  return (
    <div>
      {userInfo && <div>{userInfo.username}{userInfo.follower_count}</div>}
    </div>
    
  )
}

export default UserInfo;