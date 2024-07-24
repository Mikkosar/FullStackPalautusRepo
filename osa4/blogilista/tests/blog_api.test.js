const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('GET tests', () => {

    test('All blogs returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    
    test('Returns correct amount of blogs', async () => {
        const result = await api.get('/api/blogs');
    
        assert.strictEqual(result.body.length, 2);
    });

    test('All ids are in form of "id", not "_id" in db', async () => {
        const result = await api.get('/api/blogs');
        
        result.body.forEach(blog => {
            assert('id' in blog);
            assert(!('_id' in blog));
        });
    });

});

describe('POST tests', () => {

    test('New valid blog added successfully', async () => {
        const newBlog = {
            title:"newBlog",
            author:"tester",
            url:"www.test.fi",
            likes: 100
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');
        const titles = res.body.map(b => b.title);

        assert.strictEqual(res.body.length, helper.initialBlogs.length + 1);
        assert(titles.includes("newBlog"));
    });

    test('If a new blogs likes attribute is null it is converted to 0', async () => {
        const newBlog = {
            title:"newBlog",
            author:"tester",
            url:"www.test.fi"
        };

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const result = await api.get('/api/blogs');
        const wantgedBlog = result.body.filter(b => b.title === "newBlog");

        assert.strictEqual(wantgedBlog[0].likes, 0);
    });

    test('Statuskoodi on 400 jos blogin url tai title puuttuu', async () => {
        const newBlog = {
            author:"tester",
            likes: 100
        };

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

        const result = await api.post('/api/blogs').send(newBlog);
        assert.strictEqual(result.status, 400);
    });
});

describe('DELETE tests', () => {
    
    test('Delete first blog', async () => {
        const blogsAtStart = await helper.allBlogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.allBlogsInDb();
        const titles = blogsAtEnd.map(b => b.title);

        assert(!titles.includes(blogToDelete.title));
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

    });
});

describe('PUT tests', () => {

    test('Update likes', async () => {
        const allblogs = await helper.allBlogsInDb();
        const blogToUpdate = allblogs[0];

        const newBlog = {
            title: "This Blog Is For Testing",
            author: "Paavo Pesusieni",
            url: "www.Paavo.com",
            likes: 100
        };

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updatedBlog = await Blog.findById(blogToUpdate.id);
        assert.strictEqual(updatedBlog.title, newBlog.title);
        assert.strictEqual(updatedBlog.likes, newBlog.likes);
    });
});

after(async () => {
    await mongoose.connection.close()
})

