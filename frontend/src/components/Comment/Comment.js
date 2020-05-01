import React from "react";
import { Comment as AntdComment, Avatar, Tooltip } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

function Comment ({ comment }) {
  const { message, author: { username, name, avatar_url }, created_at } = comment;
  return (
    <AntdComment
      author={name.length === 0 ? username : name}
      avatar={
        <Link to={`${username}`}>
          <Avatar 
            src={"http://localhost:8000" + avatar_url}
            alt={username}
          />
        </Link>
      }
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    >
    </AntdComment>
  )
};

export default Comment;