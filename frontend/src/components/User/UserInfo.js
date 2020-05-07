import React from "react";
import "./UserInfo.scss";
import { Avatar } from "antd";

function UserInfo({ userInfo }) {
  const { username, follower_count, following_count, post_count, avatar_url, bio } = userInfo;
  return (
    <div className="user">
      <div className="user__avatar">
        <Avatar
          size={150}
          icon={<img src={avatar_url} alt={username} />}
        />
      </div>
      <section className="user__info">
        <div className="user__info--name"><h2>{username}</h2></div>
        <ul className="user__info--count">
          <li><span>게시물 </span><span className="count">{post_count}</span></li>
          <li><span>팔로워 </span><span className="count">{follower_count}</span></li>
          <li><span>팔로우 </span><span className="count">{following_count}</span></li>
        </ul>
        <div className="user__info--bio">{bio}</div>
      </section>
    </div>
  );
}

export default UserInfo;
