import React from "react";
import { Button, Avatar } from "antd";
import "./Suggestion.scss";
import { Link } from "react-router-dom";

function Suggestion({ suggestionUser, onFollowUser }) {
  const { username, name, avatar_url, is_follow } = suggestionUser;
  return (
    <div className="suggestion">
      <div className="suggestion__user">
        <Link to={`${username}/`}>
          <Avatar
            size="small"
            icon={
              <img
                src={avatar_url}
                alt={`${username}'s avatar`}
              />
            }
          />
        </Link>
        <div className="username">{name.length === 0 ? username : name}</div>
      </div>
      <div className="action">
        {is_follow && "팔로잉 중"}
        {!is_follow && (
          <Button size="small" onClick={() => onFollowUser(username)}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
}

export default Suggestion;
