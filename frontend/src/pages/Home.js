import React from "react";
import { Button } from "antd";
import PostList from "components/PostList";
import AppLayout from "components/AppLayout";
import { useHistory } from "react-router-dom";

function Home () {
  const history = useHistory();
  const handleClick = () => {
    history.push("/post/new");
  };
  const sidebar = (
    <>
      <Button type="primary" block style={{ width: "100%" }} onClick={handleClick}>새 포스팅 쓰기</Button>
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