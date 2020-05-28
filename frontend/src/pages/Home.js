import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { useAxios } from "utils/api";
import PostList from "components/Post/PostList";
import AppLayout from "components/Layout/AppLayout";
import StoryList from "components/Story/StoryList";
import SuggestionList from "components/Suggestion/SuggestionList";
import { useState } from "react";
import { useAppContext } from "stores/store";
import { useEffect } from "react";

function Home() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [user, setUser] = useState([]);
  const headers = { Authorization: `JWT ${jwtToken} ` };
  const history = useHistory();
  const handleClick = () => {
    history.push("/post/new");
  };
  const [{ data }] = useAxios({
    url: "accounts/profile",
    headers,
  });
  useEffect(() => {
    setUser(data);
  }, [data]);
  const sidebar = (
    <>
      <Button
        type="primary"
        block
        style={{ marginBottom: "1rem" }}
        onClick={handleClick}
      >
        새 포스팅 쓰기
      </Button>
      <StoryList style={{ marginBottom: "1rem" }} />
      <SuggestionList style={{ marginBottom: "1rem" }} />
    </>
  );
  return (
    <>
      {user && user.username && (
        <AppLayout sidebar={sidebar} username={user.username}>
          <PostList />
        </AppLayout>
      )}
    </>
  );
}

export default Home;
