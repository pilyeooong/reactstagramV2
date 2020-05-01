import React, { useState, useEffect } from "react";
import { Modal, Avatar } from "antd";
import axios from "axios";
import { useAxios } from "utils/api";

import "./Posting.scss";
import { useAppContext } from "stores/store";
import ModalComment from "./ModalComment";

function Posting({ post, userInfo }) {
  const [isVisible, setIsVisible] = useState({ visible: false });
  const [commentList, setCommentList] = useState([]);
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
  const { avatar_url, username } = userInfo;
  const { id, photo, caption } = post;

  const { store: { jwtToken } } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken} `};

  const getCommentList = async (id) => {
    const response = await axios.get(`http://localhost:8000/posts/${id}/comments/`, { headers })
    setCommentList(response.data);
  }
  const clickEvent = (id) => {    
    getCommentList(id);
    showModal();
  }

  return (
    <div>
      <img
        src={photo}
        alt={id}
        style={{ width: "300px", height: "300px" }}
        onClick={e => clickEvent(e.target.alt)}
      />
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"1000px"}
        height={"720px"}
        bodyStyle={{ padding: "0" }}
      >
        <div className="modal__container">
          <img
            className="modal__container__photo"
            key={post.id}
            src={post.photo}
            alt={post.caption}
          />
          <div className="modal__content">
            <div className="modal__header">
              <Avatar
                size="large"
                icon={
                  <img
                    src={"http://localhost:8000" + avatar_url}
                    alt={username}
                  />
                }
              />
              <span className="modal__header--name">{username}</span>
            </div>
            <div>
              {caption}
              {commentList && commentList.map((comment) => <ModalComment comment={comment} />)}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Posting;
