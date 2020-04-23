import React from "react";
import { Comment as AntdComment, Avatar, Tooltip } from "antd";
import moment from "moment";

function Comment ({ comment }) {
  const { message, author: { username, name, avatar_url }, created_at } = comment;
  return (
    <AntdComment
      author={name.length === 0 ? username : name}
      avatar={
        <Avatar 
          src={"http://localhost:8000" + avatar_url}
          alt={username}
        />
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