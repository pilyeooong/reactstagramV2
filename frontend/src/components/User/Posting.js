import React, { useState } from "react";
import { Modal, Avatar, Input, Button } from "antd";
import { axiosInstance } from "utils/api";

import "./Posting.scss";
import FollowButton from "components/Follow/FollowButton";
import { useAppContext } from "stores/store";
import ModalComment from "./ModalComment";

function Posting({ post, userInfo }) {
  const [isVisible, setIsVisible] = useState({ visible: false });
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const handleComment = async () => {
    const apiUrl = `/posts/${post.id}/comments/`;
    try{
      await axiosInstance.post(apiUrl, { message: commentContent }, { headers });
      setCommentContent("");
      const response = await axiosInstance.get(
        `/posts/${id}/comments/`,
        { headers }
      );
      setCommentList(response.data);
    }
    catch(error){
      console.log(error);
    }
  }
  const showModal = () => {
    setIsVisible({ visible: true });
  };

  const handleOk = (e) => {
    setIsVisible({ visible: false });
  };

  const handleCancel = (e) => {
    setIsVisible({ visible: false });
  };

  const { visible } = isVisible;
  const { avatar_url, username, is_following, is_self } = userInfo;
  const { id, photo, caption } = post;

  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken} ` };

  const getCommentList = async (id) => {
    const response = await axiosInstance.get(
      `/posts/${id}/comments/`,
      { headers }
    );
    setCommentList(response.data);
  };
  const clickEvent = (id) => {
    getCommentList(id);
    showModal();
  };

  return (
    <div>
      <img
        src={photo}
        alt={caption}
        id={id}
        style={{ width: "300px", height: "300px" }}
        onClick={(e) => clickEvent(e.target.id)}
      />
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"1000px"}
        height={"600px"}
        bodyStyle={{ padding: "0" }}
      >
        <div className="modal__container">
          <img
            className="modal__container__photo"
            key={post.id}
            src={post.photo}
            alt={post.caption}
            style={{ height: "600px" }}
          />
          <div className="modal__content">
            <div className="modal__header">
              <Avatar
                size="large"
                icon={
                  <img
                    src={avatar_url}
                    alt={username}
                  />
                }
              />
              <span className="modal__header--name" style={{ marginRight: "1rem" }}>{username}</span>
              {!is_self && <FollowButton username={username} is_following={is_following} />}
            </div>
            <div className="modal__caption">
              <div className="caption">{caption}</div>
            </div>
            <div className="modal__comments">
              {commentList &&
                commentList.map((comment) => (
                  <ModalComment key={comment.message} comment={comment} />
                ))}
            </div>
            <div className="modal__input">
              <Input.TextArea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                style={{ marginTop: "1rem" }}
              />
              <Button type="primary" block onClick={handleComment}>댓글쓰기</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Posting;
