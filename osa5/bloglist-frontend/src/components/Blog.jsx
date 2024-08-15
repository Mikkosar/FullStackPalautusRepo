import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = () => {
    return visible ? 'hide' : 'view';
  }

  const handleClick = () => {
    handleLike(blog);
  }

  const handleRemove = () => {
    handleDelete(blog.id);
  }

  return (
    <div data-testid='blog' style={blogStyle} className='blog'>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <p>{blog.title}<button id='viewButton' onClick={toggleVisibility}>{buttonLabel()}</button></p>
          {visible && (
            <>
              <li>Url: {blog.url}</li>
              <li data-testid='likes'>
                Likes: {blog.likes}
                <button data-testid='likebutton' id='likeButton' onClick={handleClick}>Like</button>
              </li>
              <li>Author: {blog.author}</li>
              <li>
                <button id='hideButton' onClick={handleRemove}>remove</button>
              </li>
            </>
          )}
        </ul>
    </div>

  )
}

export default Blog