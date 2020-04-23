import React from "react";
import "./Post.scss";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";


function Post({ post, handleLike }) {
  const { photo, caption, author : { avatar_url, username }, location, is_like } = post;
  
  return (
    <div className="post">
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartFilled onClick={() => handleLike({ post, isLike: false })} />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
        style={{ marginBottom: "1rem" }}
      >
        <Card.Meta
          avatar={
            <Link to={`${username}`}>
              <Avatar
                size="large"
                icon={
                  <img
                    src={"http://localhost:8000" + avatar_url}
                    alt={username}
                  />
                }
              />
            </Link>
          }
          title={location}
          description={caption}
          style={{ marginBotton: "20px" }}
        />
        <CommentList post={post} />
      </Card>
    </div>
  )
}

export default Post;