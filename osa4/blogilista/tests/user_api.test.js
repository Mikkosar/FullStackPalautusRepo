const bcrypt = require('bcrypt');
const User = require('../models/user');

const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('salaisuus', 10);
    const user = new User({ username: 'user', passwordHash })

    user.save()
});

describe('There is only one user in db at the start', () => {

    test('user creation works with a fresh username', async () => {
        const usersAtStart = await helper.allUsersInDb();

        const newUser = {
            username: 'Mikki420',
            name: 'Mikki Hiiri',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.allUsersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.allUsersInDb();

        const newUser = {
            username: 'user',
            name: 'user',
            password: 'salainen',
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        const usersAtEnd = await helper.allUsersInDb();
        assert(res.body.error.includes('expected `username` to be unique'));
        assert.strictEqual(usersAtStart.length, usersAtEnd.length);
    });
});

after(async () => {
    await mongoose.connection.close();
});