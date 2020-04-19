import React from "react";
import AppLayout from "components/AppLayout";
import PostList from "components/PostList";
function Home () {
  return (
    <AppLayout>
      <PostList />
    </AppLayout>
  )
}

export default Home;