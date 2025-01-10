import Blog from './Blog';

const BlogList = ({ blogs, handleLike, handleDelete }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
    </>
  );
};

export default BlogList;