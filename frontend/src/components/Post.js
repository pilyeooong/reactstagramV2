import React from "react";
import "./Post.scss";
import { Avatar, Card } from "antd";


function Post({ post }) {
  const { photo, caption, author : { avatar_url, username }, location } = post;
  return (
    <div className="post">
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        // actions={[
        //   is_like ? (
        //     <HeartFilled onClick={() => handleLike({ post, isLike: false })} />
        //   ) : (
        //     <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
        //   ),
        // ]}
        style={{ marginBottom: "1rem" }}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={"http://localhost:8000" + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
          style={{ marginBotton: "20px" }}
        />
        {/* <CommentList post={post} /> */}
      </Card>
    </div>
  )
}

export default Post;