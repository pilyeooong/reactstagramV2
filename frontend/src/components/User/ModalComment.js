import React from "react";
import { Comment as AntdComment, Avatar, Tooltip } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

function ModalComment ({ comment }) {
  const { message, author: { username, name, avatar_url }, created_at } = comment;
  return (
    <div>
      {message}
    </div>
  )
};

export default ModalComment;