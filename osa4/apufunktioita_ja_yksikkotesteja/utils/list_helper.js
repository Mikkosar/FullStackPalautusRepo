const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let sum = blogs.reduce((sum, item) => {
        return sum + item.likes;
    }, 0);

    return sum;
};

const favoriteBlog = (blogs) => {
    
    const blog = blogs.reduce((max, current) => {
        return (current.likes > max.likes) ? current : max;
    }, blogs[0]);

    const favBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    };

    return favBlog;
};
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};