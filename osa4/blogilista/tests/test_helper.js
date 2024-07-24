const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: "This Blog Is For Testing",
        author: "Paavo Pesusieni",
        url: "www.Paavo.com",
        likes: 23
    },
    {
        title: "This Blog Is Also For Testing Also",
        author: "Patrik Tahtonen",
        url: "www.Patrik.com",
        likes: 2
    }
];

const allBlogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    allBlogsInDb
}