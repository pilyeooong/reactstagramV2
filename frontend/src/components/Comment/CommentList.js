import React, { useState } from "react";
import { useAxios, axiosInstance } from "utils/api";
import { useAppContext } from "stores/store";
import Comment from "./Comment";
import { Input, Button} from "antd";

function CommentList ({ post }) {
  const { store: { jwtToken }} = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` }
  const [commentContent, setCommentContent] = useState("");
  const [{ data: commentList }, refetch] = useAxios({
    url: `posts/${post.id}/comments/`,
    headers
  });
  const handleComment = async () => {
    const apiUrl = `/posts/${post.id}/comments/`;
    try{
      await axiosInstance.post(apiUrl, { message: commentContent }, { headers });
      setCommentContent("");
      refetch();
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      {commentList && commentList.map(comment => <Comment key={comment.id} comment={comment} />)}
      <Input.TextArea 
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <Button onClick={handleComment}>댓글쓰기</Button>
    </div>
  )
};

export default CommentList;