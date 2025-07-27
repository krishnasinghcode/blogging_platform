import API from "./axios";

export const fetchCommentsByBlogId = async (blogId) => {
  const res = await API.get(`/comments/${blogId}`);
  return res.data;
};

export const postComment = async (blogId, content) => {
  const res = await API.post(`/comments/${blogId}`, { content });
  return res.data.comment;
};


export const deleteComment = async (commentId, token) => {
  await API.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
