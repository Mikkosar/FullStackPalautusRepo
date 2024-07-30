const Blog = require('../models/blog');
const User = require('../models/user')

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

const allUsersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

module.exports = {
    initialBlogs,
    allBlogsInDb,
    allUsersInDb,
}