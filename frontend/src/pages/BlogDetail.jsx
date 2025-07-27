import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCommentsByBlogId, postComment, deleteComment } from '../api/commentAPI';
import { fetchBlogById } from '../api/blogAPI';
import Input from '../components/Input';
import Button from '../components/Button';

const BlogDetails = () => {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogData = await fetchBlogById(id);
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoadingBlog(false);
      }
    };
    loadBlog();
  }, [id]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentData = await fetchCommentsByBlogId(id);
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoadingComments(false);
      }
    };
    loadComments();
  }, [id]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const comment = await postComment(id, newComment);
      setComments(prev => [...prev, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, token);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loadingBlog)
    return <div className="text-center mt-10 text-base-content">Loading blog...</div>;

  if (!blog)
    return <div className="text-center mt-10 text-error">Blog not found.</div>;
  console.log(comments)
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Blog Section */}
      <div className="mb-8 bg-base-200 p-6 rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-4 text-base-content">{blog.title}</h1>
        <p className="text-sm text-neutral-content">
          By <span className="font-semibold">{blog.author?.username || 'Unknown Author'}</span> •{' '}
          {new Date(blog.updatedAt).toLocaleDateString()}
        </p>
        <div className="py-5">
          <p className="whitespace-pre-line text-base-content">{blog.content}</p>
        </div>
      </div>

      {/* Comment Input */}
      {user ? (
        <div className="mb-6 bg-base-100 p-4 rounded-lg shadow">
          <Input
            label="Leave a Comment"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="text-base-content"
          />
          <Button
            text="Post Comment"
            onClick={handleSubmit}
            variant="primary"
            className="mt-2"
          />
        </div>
      ) : (
        <p className="text-neutral-content">Login to post a comment.</p>
      )}

      {/* Comments */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-base-content mb-6 border-b border-base-300 pb-2">
          Comments
        </h2>

        {loadingComments ? (
          <div className="text-center text-neutral-content py-4">Loading comments...</div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="bg-base-200 text-base-content p-4 rounded-xl shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{c.username || 'Unknown'}</span>
                  <span className="text-xs text-neutral-content">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-base-content mb-3">
                  {c.content}
                </p>
                {user?._id === c.user && (
                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    className="text-sm text-error hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-content py-4">No comments yet.</p>
        )}
      </div>

    </div>
  );
};

export default BlogDetails;
