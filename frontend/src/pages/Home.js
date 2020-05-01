import React from "react";
import { Button } from "antd";
import PostList from "components/Post/PostList";
import AppLayout from "components/Layout/AppLayout";
import { useHistory } from "react-router-dom";
import StoryList from "components/Story/StoryList";
import SuggestionList from "components/Suggestion/SuggestionList";

function Home () {
  const history = useHistory();
  const handleClick = () => {
    history.push("/post/new");
  };
  const sidebar = (
    <>
      <Button type="primary" block style={{ marginBottom: "1rem" }} onClick={handleClick}>새 포스팅 쓰기</Button>
      <StoryList style={{ marginBottom: "1rem" }}/>
      <SuggestionList style={{ marginBottom: "1rem" }} />
    </>
  )
  return (
    <>
      <AppLayout sidebar={sidebar}>
        <PostList />
      </AppLayout>
    </>
  )
}

export default Home;