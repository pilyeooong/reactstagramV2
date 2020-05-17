import React from "react";
import "./UserInfo.scss";
import { Avatar, Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useAppContext, deleteToken } from "stores/store";
import { useHistory } from "react-router-dom";

function UserInfo({ userInfo }) {
  const { dispatch } = useAppContext();
  const history = useHistory();
  const {
    username,
    follower_count,
    following_count,
    post_count,
    avatar_url,
    bio,
    is_self,
  } = userInfo;

  const logOut = () => {
    dispatch(deleteToken());
    notification.open({
      message: "로그아웃 완료",
      icon: <SmileOutlined style={{ color: "108ee9" }} />,
    });
    history.push("/");
  };

  return (
    <div className="user">
      <div className="user__avatar">
        <Avatar size={150} icon={<img src={avatar_url} alt={username} />} />
      </div>
      <section className="user__info">
        <div className="user__info--name">
          <h2>{username}</h2>
          {is_self && (
            <Button type="ghost" onClick={logOut}>
              로그아웃
            </Button>
          )}
        </div>
        <ul className="user__info--count">
          <li>
            <span>게시물 </span>
            <span className="count">{post_count}</span>
          </li>
          <li>
            <span>팔로워 </span>
            <span className="count">{follower_count}</span>
          </li>
          <li>
            <span>팔로우 </span>
            <span className="count">{following_count}</span>
          </li>
        </ul>
        <div className="user__info--bio">{bio}</div>
      </section>
    </div>
  );
}

export default UserInfo;
