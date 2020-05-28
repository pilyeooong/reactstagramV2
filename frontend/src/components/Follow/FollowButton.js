import React from "react";
import { useAppContext } from "stores/store";
import { axiosInstance } from "utils/api";
import { useState } from "react";
import { Button } from "antd";

function FollowButton({ username, is_following }){
  const { store : { jwtToken }} = useAppContext();
  const [isFollow, setIsFollow] = useState(is_following);
  const headers = { Authorization : `JWT ${jwtToken}` };
  const data = { username };
  const config = { headers };
  
  const onFollow = () => {
    if(isFollow){
      setIsFollow(false);
      axiosInstance.post("accounts/unfollow/", data, config);
    } else {
      setIsFollow(true);
      axiosInstance.post("accounts/follow/", data, config);
    }
  }

  return (
    <div>
      {isFollow ? <Button type="ghost" onClick={onFollow}>팔로우 끊기</Button> : <Button type="primary" onClick={onFollow}>팔로우</Button>}
    </div>
  )
}

export default FollowButton;