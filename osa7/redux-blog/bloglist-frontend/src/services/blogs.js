import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.put(url, likedBlog);
  return response.data;
};

const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.delete(url);
  return response.data;
};

const commentBlog = async (id, com) => {
  const url = `${baseUrl}/${id}/comments`;
  const c = {
    comment: com,
  };
  const response = await axios.put(url, c);
  return response.data;
};

export default { getAll, setToken, create, update, deleteBlog, commentBlog };
