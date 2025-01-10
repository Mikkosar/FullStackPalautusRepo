import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';

import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: {
      reducer: (state, action) => {
        return action.payload;
      },
    },
    appendBlog: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
    },
    likeBlog: {
      reducer: (state, action) => {
        const id = action.payload.id;
        const blogToLike = state.find((b) => b.id === id);
        const likedBlog = {
          ...blogToLike,
          likes: blogToLike.likes + 1,
        };
        return state.map((b) => (b.id !== id ? b : likedBlog));
      },
    },
    removeBlog: {
      reducer: (state, action) => {
        return state.filter((b) => b.id !== action.payload);
      },
    },
    commentBlog: {
      reducer: (state, action) => {
        const id = action.payload.id;
        const comment = action.payload.comment;
        const blogToComment = state.find((b) => b.id === id);
        const commentedBlog = {
          ...blogToComment,
          comments: blogToComment.comments.concat(comment),
        };
        return state.map((b) => (b.id !== id ? b : commentedBlog));
      },
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      dispatch(appendBlog(createdBlog));
      dispatch(setNotification('test blog added successfully', 5000));
    } catch (error) {
      dispatch(setNotification('title or url is missing', 5000));
    }
  };
};

export const likeSelectedBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update(blog);
      dispatch(likeBlog(likedBlog));
      dispatch(setNotification('blog liked', 5000));
    } catch (error) {
      dispatch(setNotification('like failed for some reason', 5000));
    }
  };
};

export const removeSelectedBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(removeBlog(id));
      dispatch(setNotification('blog was removed successfully', 5000));
    } catch (error) {
      dispatch(setNotification('blog removal failed', 5000));
    }
  };
};

export const CommentSelectedBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      await blogService.commentBlog(id, comment);
      dispatch(commentBlog(id, comment));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setBlogs, appendBlog, likeBlog, removeBlog, commentBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
