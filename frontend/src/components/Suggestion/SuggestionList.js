import React, { useState, useEffect } from "react";
import { useAppContext } from "stores/store";
import { useAxios, axiosInstance } from "utils/api";
import { Card } from "antd";
import Suggestion from "./Suggestion";

function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [userList, setUserList] = useState([]);
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origUserList, loading }, refetch] = useAxios({
    url: "/accounts/suggestion",
    headers,
  });

  useEffect(() => {
    if (!origUserList) {
      setUserList([]);
    } else {
      setUserList(origUserList.map((user) => ({ ...user, is_follow: false })));
    }
  }, [origUserList]);

  const onFollowUser = (username) => {
    const data = { username };
    const config = { headers };
    axiosInstance.post("/accounts/follow/", data, config).then((response) => {
      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user.username !== username ? user : { ...user, is_follow: true }
        )
      );
    })
    .catch(error => {
      console.log(error);
    })
  };

  return (
    <div style={style}>
      {loading && <div>loading</div>}
      <Card title="Suggestions for you" size="small">
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
              onFollowUser={onFollowUser}
            />
          ))}
      </Card>
    </div>
  );
}

export default SuggestionList;
